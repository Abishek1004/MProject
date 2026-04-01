import { useState } from 'react'

/**
 * Image component with graceful emoji/JSX fallback
 */
export default function ImgF({ src, fallback, alt, className, style }) {
  const [failed, setFailed] = useState(false)

  if (failed || !src) {
    if (typeof fallback === 'string') {
      return <span className={className} style={style}>{fallback}</span>
    }
    return <div className={className} style={style}>{fallback}</div>
  }

  return (
    <img
      src={src}
      alt={alt || ''}
      className={className}
      style={style}
      onError={() => setFailed(true)}
    />
  )
}
