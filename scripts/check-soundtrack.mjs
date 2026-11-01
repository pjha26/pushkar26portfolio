import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
const wav = await readFile(new URL('../public/audio/quiet-circuit.wav', import.meta.url))
assert.equal(wav.toString('ascii', 0, 4), 'RIFF')
assert.equal(wav.toString('ascii', 8, 12), 'WAVE')
assert.equal(wav.readUInt16LE(20), 1, 'The soundtrack must use browser-compatible PCM')
assert.equal(wav.readUInt16LE(34), 16)
const rate = wav.readUInt32LE(24)
const count = wav.readUInt32LE(40) / 2
assert.equal(count / rate, 32)
let peak = 0
let square = 0
let openingSquare = 0
for (let i = 0; i < count; i++) {
  const sample = wav.readInt16LE(44 + i * 2) / 32768
  peak = Math.max(peak, Math.abs(sample))
  square += sample * sample
  if (i < rate) openingSquare += sample * sample
}
const rms = Math.sqrt(square / count)
assert.ok(rms > 0.1 && rms < 0.35, 'The track must have audible, controlled average level')
assert.ok(Math.sqrt(openingSquare / rate) > 0.08, 'The first second must be audible')
assert.ok(peak < 0.9, 'The soundtrack must retain headroom without clipping')
console.log(`Soundtrack passed: 32s PCM, RMS ${rms.toFixed(3)}, peak ${peak.toFixed(3)}.`)
