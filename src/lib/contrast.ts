function canal(v: number): number {
  const s = v / 255
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
}

export function luminanceRelative(hex: string): number {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return 0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(b)
}

export function contrastRatio(hex1: string, hex2: string): number {
  const l1 = luminanceRelative(hex1)
  const l2 = luminanceRelative(hex2)
  const [clair, sombre] = l1 > l2 ? [l1, l2] : [l2, l1]
  return (clair + 0.05) / (sombre + 0.05)
}
