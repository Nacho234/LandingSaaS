import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

interface CounterProps {
  to: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
  format?: (n: number) => string
}

/** Número que cuenta de 0 a su valor al entrar en viewport. */
export function Counter({ to, prefix = '', suffix = '', duration = 1.6, className, format }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!inView || !ref.current) return
    const el = ref.current
    const render = (v: number) => {
      el.textContent = `${prefix}${format ? format(v) : Math.round(v).toLocaleString('es-AR')}${suffix}`
    }
    if (reduce) {
      render(to)
      return
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: render,
    })
    return () => controls.stop()
  }, [inView, to, prefix, suffix, duration, reduce, format])

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  )
}
