import { ProviderError, ValidationError } from '../../../shared/domain/index.js'

export interface SpeechTranscriber {
  transcribe(audioBuffer: Buffer, mimeType: string): Promise<string>
}

export class GeminiSpeechTranscriber implements SpeechTranscriber {
  readonly #apiKey: string
  readonly #model: string

  constructor(apiKey: string, model = 'gemini-1.5-flash') {
    this.#apiKey = apiKey
    this.#model = model
  }

  public async transcribe(audioBuffer: Buffer, mimeType: string): Promise<string> {
    if (!this.#apiKey) {
      throw new ProviderError('GOOGLE_AI_API_KEY no configurada en el servidor')
    }

    // Límite de tamaño máximo (10 MB)
    const MAX_SIZE = 10 * 1024 * 1024
    if (audioBuffer.length > MAX_SIZE) {
      throw new ValidationError('El archivo de audio supera el límite permitido de 10 MB')
    }

    try {
      const base64Audio = audioBuffer.toString('base64')
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.#model}:generateContent?key=${this.#apiKey}`

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: 'Transcribe el siguiente audio en español con exactitud, sin comentarios adicionales ni preámbulos. Solo devuelve la transcripción directa del texto hablado.',
                },
                {
                  inlineData: {
                    mimeType,
                    data: base64Audio,
                  },
                },
              ],
            },
          ],
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new ProviderError(`Fallo en transcripción con Gemini (${response.status}): ${errorText}`)
      }

      const data = await response.json() as any
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || ''
      return text.trim()
    } catch (err: any) {
      if (err instanceof ProviderError || err instanceof ValidationError) throw err
      throw new ProviderError(`Error transcribiendo audio con Gemini: ${err?.message || String(err)}`)
    }
  }
}
