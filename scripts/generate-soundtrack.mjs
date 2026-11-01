import { mkdir, writeFile } from 'node:fs/promises'

// Quiet Circuit: an original instrumental, synthesized without recordings or samples.
const sampleRate = 22050
const duration = 32
const samples = new Float32Array(sampleRate * duration)
const chords = [
  [293.66, 349.23, 440, 523.25],
  [233.08, 293.66, 349.23, 440],
  [261.63, 349.23, 440, 523.25],
  [261.63, 293.66, 392, 523.25],
]
const melody = [587.33, 440, 698.46, 523.25, 659.25, 440, 523.25, 392]
const tau = Math.PI * 2
for (let i = 0; i < samples.length; i++) {
  const t = i / sampleRate
  const chordTime = t % 8
  const chord = chords[Math.floor(t / 8)]
  const padEnvelope = Math.min(1, chordTime / 0.3, (8 - chordTime) / 0.7)
  let sample = 0
  chord.forEach((frequency, voice) => {
    const detune = 1 + (voice - 1.5) * 0.0008
    sample +=
      (Math.sin(tau * frequency * detune * t) + 0.18 * Math.sin(tau * frequency * 2 * t)) *
      0.075 *
      padEnvelope
  })
  const noteTime = t % 1
  const note = melody[Math.floor(t) % melody.length]
  const envelope = Math.min(1, noteTime / 0.018) * Math.exp(-noteTime * 4.5)
  sample += (Math.sin(tau * note * t) + 0.25 * Math.sin(tau * note * 2 * t)) * envelope * 0.15
  sample += Math.sin(((tau * chord[0]) / 2) * t) * 0.05 * (0.8 + 0.2 * Math.sin((tau * t) / 2))
  samples[i] = sample * Math.min(1, t / 0.04, (duration - t) / 0.08)
}
let peak = 0
for (const sample of samples) peak = Math.max(peak, Math.abs(sample))
const wav = Buffer.alloc(44 + samples.length * 2)
wav.write('RIFF', 0)
wav.writeUInt32LE(wav.length - 8, 4)
wav.write('WAVEfmt ', 8)
wav.writeUInt32LE(16, 16)
wav.writeUInt16LE(1, 20)
wav.writeUInt16LE(1, 22)
wav.writeUInt32LE(sampleRate, 24)
wav.writeUInt32LE(sampleRate * 2, 28)
wav.writeUInt16LE(2, 32)
wav.writeUInt16LE(16, 34)
wav.write('data', 36)
wav.writeUInt32LE(samples.length * 2, 40)
for (let i = 0; i < samples.length; i++)
  wav.writeInt16LE(Math.round(((samples[i] * 0.78) / peak) * 32767), 44 + i * 2)
await mkdir(new URL('../public/audio/', import.meta.url), { recursive: true })
await writeFile(new URL('../public/audio/quiet-circuit.wav', import.meta.url), wav)
console.log(`Wrote Quiet Circuit: ${duration}s, ${(wav.length / 1024 / 1024).toFixed(2)} MB.`)
