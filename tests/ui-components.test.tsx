import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../src/components/ui/Button.js'
import { Textarea } from '../src/components/ui/Textarea.js'
import { Timer } from '../src/components/patterns/Timer.js'
import { SessionTimer } from '../src/features/session/domain/session-timer.js'

describe('UI: Button Component', () => {
  it('se renderiza correctamente y maneja clics', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Enviar Respuesta</Button>)

    const btn = screen.getByRole('button', { name: /enviar respuesta/i })
    expect(btn).toBeInTheDocument()

    fireEvent.click(btn)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('se deshabilita y muestra estado de carga cuando isLoading es true', () => {
    render(<Button isLoading>Acción</Button>)
    const btn = screen.getByRole('button')
    expect(btn).toBeDisabled()
    expect(screen.getByText(/cargando.../i)).toBeInTheDocument()
  })

  it('tiene la clase tap-target para garantizar área táctil mínima de 44 px', () => {
    render(<Button>Táctil</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('tap-target')
  })
})

describe('UI: Textarea Component con contador de palabras', () => {
  it('cuenta correctamente las palabras ingresadas', () => {
    render(
      <Textarea
        label="Tu respuesta"
        value="Uno dos tres cuatro cinco"
        onChange={() => {}}
      />
    )

    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText(/palabras/i)).toBeInTheDocument()
  })

  it('muestra aviso si el texto tiene menos de las palabras mínimas requeridas', () => {
    render(
      <Textarea
        label="Respuesta corta"
        value="Solo dos"
        minWords={3}
        onChange={() => {}}
      />
    )

    expect(screen.getByText(/mínimo requerido: 3 palabras/i)).toBeInTheDocument()
  })
})

describe('UI: Timer Pattern Component', () => {
  it('muestra el tiempo formateado en mm:ss', () => {
    render(<Timer formattedTime="04:25" />)
    expect(screen.getByText('04:25')).toBeInTheDocument()
  })

  it('permite pausar y reanudar con botones accesibles', () => {
    const handleToggle = vi.fn()
    const handleReset = vi.fn()
    render(<Timer formattedTime="01:30" isRunning={true} onToggle={handleToggle} onReset={handleReset} />)

    const toggleBtn = screen.getByTitle('Pausar cronómetro')
    fireEvent.click(toggleBtn)
    expect(handleToggle).toHaveBeenCalledTimes(1)

    const resetBtn = screen.getByTitle('Reiniciar cronómetro')
    fireEvent.click(resetBtn)
    expect(handleReset).toHaveBeenCalledTimes(1)
  })
})

describe('Domain: SessionTimer Observer', () => {
  it('formatea correctamente los segundos a mm:ss', () => {
    expect(SessionTimer.format(0)).toBe('00:00')
    expect(SessionTimer.format(65)).toBe('01:05')
    expect(SessionTimer.format(3600)).toBe('60:00')
  })

  it('notifica a los observadores al reiniciar y pausar', () => {
    const timer = new SessionTimer(30)
    expect(timer.seconds).toBe(30)
    expect(timer.formatted).toBe('00:30')

    const listener = vi.fn()
    timer.subscribe(listener)

    timer.reset(0)
    expect(timer.seconds).toBe(0)
    expect(listener).toHaveBeenCalledWith(0)
  })
})
