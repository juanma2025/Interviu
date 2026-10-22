import { z } from 'zod'
import { Evaluation, Score, Rubric, ProviderError } from '../../../shared/domain/index.js'

export interface FeedbackResult {
  evaluation: Evaluation
  tokensIn: number
  tokensOut: number
}

export interface FeedbackProvider {
  evaluate(
    questionText: string,
    questionTip: string,
    answerText: string,
    rubric: Rubric
  ): Promise<FeedbackResult>
}

// Zod schema para validar estrictamente la respuesta del modelo Claude
const ClaudeOutputSchema = z.object({
  score: z.number().min(0).max(10),
  criteria: z.array(
    z.object({
      key: z.string(),
      met: z.boolean(),
      comment: z.string(),
      suggestion: z.string().optional().nullable(),
    })
  ).min(3),
  starSegments: z.array(
    z.object({
      type: z.enum(['situation', 'task', 'action', 'result']),
      start: z.number().int().nonnegative(),
      end: z.number().int().positive(),
    })
  ).default([]),
})

export class ClaudeFeedbackProvider implements FeedbackProvider {
  readonly #apiKey: string
  readonly #model: string

  constructor(apiKey: string, model = 'claude-3-5-haiku-20241022') {
    this.#apiKey = apiKey
    this.#model = model
  }

  public async evaluate(
    questionText: string,
    questionTip: string,
    answerText: string,
    rubric: Rubric
  ): Promise<FeedbackResult> {
    const prompt = this.buildPrompt(questionText, questionTip, answerText, rubric)

    try {
      // Llamada HTTP al endpoint de Anthropic Messages API
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.#apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: this.#model,
          max_tokens: 1024,
          system:
            'Eres un entrevistador técnico y evaluador de talento de élite. Evalúa la respuesta del candidato basándote exclusivamente en la rúbrica STAR suministrada. Debes responder ÚNICAMENTE con un objeto JSON válido, sin preámbulos, explicaciones en markdown ni texto fuera del bloque JSON.',
          messages: [{ role: 'user', content: prompt }],
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new ProviderError(`Fallo en proveedor Claude (${response.status}): ${errorText}`)
      }

      const data = await response.json() as any
      const contentText = data?.content?.[0]?.text || ''
      const tokensIn = data?.usage?.input_tokens ?? 0
      const tokensOut = data?.usage?.output_tokens ?? 0

      // Limpiar posibles etiquetas de código markdown (```json ... ```)
      const cleanJson = contentText
        .replace(/```json/gi, '')
        .replace(/```/g, '')
        .trim()

      const parsedJson = JSON.parse(cleanJson)
      const validated = ClaudeOutputSchema.parse(parsedJson)

      // Ajustar límites de índices si superan el tamaño del texto
      const textLen = answerText.length
      const sanitizedSegments = validated.starSegments
        .filter((s) => s.start < textLen)
        .map((s) => ({
          type: s.type,
          start: Math.min(s.start, textLen),
          end: Math.min(s.end, textLen),
        }))

      const evaluation = new Evaluation({
        score: Score.of(validated.score),
        criteria: validated.criteria,
        starSegments: sanitizedSegments,
        promptVersion: 'v1.0',
        rubricVersion: rubric.version,
      })

      return { evaluation, tokensIn, tokensOut }
    } catch (err: any) {
      if (err instanceof ProviderError) throw err
      throw new ProviderError(`Error procesando evaluación con Claude: ${err?.message || String(err)}`)
    }
  }

  private buildPrompt(
    questionText: string,
    questionTip: string,
    answerText: string,
    rubric: Rubric
  ): string {
    const criteriaList = rubric.criteria
      .map((c) => `- ${c.key} (${c.name}, peso: ${(c.weight * 100).toFixed(0)}%): ${c.description}`)
      .join('\n')

    return `
Evalúa la siguiente respuesta de entrevista técnica según los criterios de la rúbrica STAR.

PREGUNTA:
"${questionText}"

CONSEJO GUÍA ESPERADO:
"${questionTip}"

RESPUESTA DEL CANDIDATO:
"${answerText}"

CRITERIOS DE LA RÚBRICA:
${criteriaList}

INSTRUCCIONES DE FORMATO:
Responde con un ÚNICO objeto JSON con la siguiente estructura exacta:
{
  "score": <número flotante de 0 a 10 con 1 decimal>,
  "criteria": [
    {
      "key": "<clave del criterio>",
      "met": <true o false>,
      "comment": "<retroalimentación constructiva específica de 1 o 2 oraciones>",
      "suggestion": "<sugerencia práctica accionable si met es false, o null si met es true>"
    }
  ],
  "starSegments": [
    {
      "type": "situation" | "task" | "action" | "result",
      "start": <índice de carácter donde empieza el fragmento en la respuesta>,
      "end": <índice de carácter donde termina el fragmento en la respuesta>
    }
  ]
}
`.trim()
  }
}
