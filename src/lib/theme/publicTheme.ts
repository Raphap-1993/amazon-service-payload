export type PublicThemeData = {
  accent: string
  accentSoft: string
  accentStrong: string
  bg: string
  lineDark: string
  lineStrong: string
  muted: string
  mutedDark: string
  paper: string
  paperMuted: string
  paperTint: string
  surface: string
  surfaceMuted: string
  surfaceStrong: string
  text: string
  textDark: string
}

type BrandingSeed = {
  accentColor?: string | null
  primaryColor?: string | null
  secondaryColor?: string | null
}

export const defaultPublicTheme: PublicThemeData = {
  accent: '#78c04c',
  accentSoft: 'rgba(120, 192, 76, 0.16)',
  accentStrong: '#2f7d32',
  bg: '#eef4ef',
  lineDark: 'rgba(16, 44, 39, 0.14)',
  lineStrong: 'rgba(16, 44, 39, 0.22)',
  muted: '#c7dad2',
  mutedDark: '#516a63',
  paper: '#edf4ef',
  paperMuted: '#e2ebe4',
  paperTint: '#f7faf7',
  surface: '#0f312c',
  surfaceMuted: '#173e37',
  surfaceStrong: '#0a221f',
  text: '#f5fbf8',
  textDark: '#102c27',
}

function normalizeHex(value?: string | null): string | null {
  if (typeof value !== 'string') {
    return null
  }

  const trimmed = value.trim()

  if (/^#[\da-f]{6}$/i.test(trimmed)) {
    return trimmed.toLowerCase()
  }

  if (/^#[\da-f]{3}$/i.test(trimmed)) {
    const [, r, g, b] = trimmed

    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase()
  }

  return null
}

function clampChannel(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)))
}

function hexToRgb(hex: string) {
  return {
    b: Number.parseInt(hex.slice(5, 7), 16),
    g: Number.parseInt(hex.slice(3, 5), 16),
    r: Number.parseInt(hex.slice(1, 3), 16),
  }
}

function rgbToHex(red: number, green: number, blue: number): string {
  return `#${[red, green, blue]
    .map((channel) => clampChannel(channel).toString(16).padStart(2, '0'))
    .join('')}`
}

function mixColors(baseHex: string, targetHex: string, ratio: number): string {
  const weight = Math.max(0, Math.min(1, ratio))
  const base = hexToRgb(baseHex)
  const target = hexToRgb(targetHex)

  return rgbToHex(
    base.r + (target.r - base.r) * weight,
    base.g + (target.g - base.g) * weight,
    base.b + (target.b - base.b) * weight,
  )
}

function toAlpha(hex: string, opacity: number): string {
  const { b, g, r } = hexToRgb(hex)
  const alpha = Math.max(0, Math.min(1, opacity))

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function getContrastText(hex: string): string {
  const { b, g, r } = hexToRgb(hex)
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255

  return luminance > 0.62 ? '#102c27' : '#f5fbf8'
}

export function buildPublicTheme(seed?: BrandingSeed | null): PublicThemeData {
  const accent = normalizeHex(seed?.primaryColor) || defaultPublicTheme.accent
  const surface = normalizeHex(seed?.secondaryColor) || defaultPublicTheme.surface
  const paper = normalizeHex(seed?.accentColor) || defaultPublicTheme.paper
  const surfaceStrong = mixColors(surface, '#000000', 0.28)
  const surfaceMuted = mixColors(surface, '#ffffff', 0.12)
  const textDark = mixColors(surface, '#000000', 0.2)

  return {
    accent,
    accentSoft: toAlpha(accent, 0.16),
    accentStrong: mixColors(accent, '#000000', 0.34),
    bg: mixColors(paper, '#ffffff', 0.18),
    lineDark: toAlpha(textDark, 0.14),
    lineStrong: toAlpha(textDark, 0.22),
    muted: mixColors(getContrastText(surface), surface, 0.3),
    mutedDark: mixColors(textDark, '#ffffff', 0.35),
    paper,
    paperMuted: mixColors(paper, surface, 0.06),
    paperTint: mixColors(paper, '#ffffff', 0.36),
    surface,
    surfaceMuted,
    surfaceStrong,
    text: getContrastText(surface),
    textDark,
  }
}

export function getPublicThemeVars(theme?: PublicThemeData | null): Record<string, string> {
  const resolvedTheme = theme || defaultPublicTheme

  return {
    '--accent': resolvedTheme.accent,
    '--accent-soft': resolvedTheme.accentSoft,
    '--accent-strong': resolvedTheme.accentStrong,
    '--bg': resolvedTheme.bg,
    '--line-dark': resolvedTheme.lineDark,
    '--line-strong': resolvedTheme.lineStrong,
    '--muted': resolvedTheme.muted,
    '--muted-dark': resolvedTheme.mutedDark,
    '--paper': resolvedTheme.paper,
    '--paper-muted': resolvedTheme.paperMuted,
    '--paper-tint': resolvedTheme.paperTint,
    '--surface': resolvedTheme.surface,
    '--surface-muted': resolvedTheme.surfaceMuted,
    '--surface-strong': resolvedTheme.surfaceStrong,
    '--text': resolvedTheme.text,
    '--text-dark': resolvedTheme.textDark,
  }
}
