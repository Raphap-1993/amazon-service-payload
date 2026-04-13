import type { CSSProperties } from 'react'

export function buildMediaObjectPosition(
  focalX?: number,
  focalY?: number,
): CSSProperties | undefined {
  if (typeof focalX !== 'number' && typeof focalY !== 'number') {
    return undefined
  }

  return {
    objectPosition: `${typeof focalX === 'number' ? focalX : 50}% ${
      typeof focalY === 'number' ? focalY : 50
    }%`,
  }
}
