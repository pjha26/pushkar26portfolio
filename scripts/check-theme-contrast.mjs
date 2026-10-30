import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const css = await readFile(new URL('../app/globals.css', import.meta.url), 'utf8')
const palettes = [
  ['light', /:root\s*\{([^}]+)\}/],
  ['dark', /html\[data-theme='dark'\]\s*\{([^}]+)\}/],
]
function luminance(hex) {
  const channels = hex.match(/[a-f\d]{2}/gi).map((part) => {
    const value = parseInt(part, 16) / 255
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  })
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
}
for (const [name, pattern] of palettes) {
  const block = css.match(pattern)?.[1]
  assert.ok(block, `${name} palette must exist`)
  const colors = Object.fromEntries(
    [...block.matchAll(/--([\w-]+):\s*(#[a-f\d]{6})\s*;/gi)].map((match) => [match[1], match[2]])
  )
  for (const [foreground, background] of [
    ['ink', 'paper'],
    ['muted', 'paper'],
    ['muted', 'surface'],
    ['accent', 'paper'],
    ['button-ink', 'button'],
  ]) {
    assert.ok(
      colors[foreground] && colors[background],
      `${name} needs both ${foreground} and ${background}`
    )
    const values = [luminance(colors[foreground]), luminance(colors[background])].sort(
      (a, b) => b - a
    )
    const ratio = (values[0] + 0.05) / (values[1] + 0.05)
    assert.ok(
      ratio >= 4.5,
      `${name} ${foreground}/${background}: ${ratio.toFixed(2)} must reach 4.5:1`
    )
  }
}
console.log('Both themes pass WCAG AA contrast checks for body, muted, accent, and button text.')
