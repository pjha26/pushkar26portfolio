// An original, generated pad progression. No samples or third-party recordings.
export function createAmbientAudio(context: AudioContext) {
  const output = context.createGain()
  const filter = context.createBiquadFilter()
  const echo = context.createDelay(1)
  const feedback = context.createGain()
  const wet = context.createGain()
  output.gain.setValueAtTime(0, context.currentTime)
  output.gain.linearRampToValueAtTime(0.16, context.currentTime + 2)
  filter.type = 'lowpass'
  filter.frequency.value = 900
  filter.Q.value = 0.3
  echo.delayTime.value = 0.42
  feedback.gain.value = 0.18
  wet.gain.value = 0.2
  filter.connect(output)
  filter.connect(echo)
  echo.connect(feedback)
  feedback.connect(echo)
  echo.connect(wet)
  wet.connect(output)
  output.connect(context.destination)

  const chords = [
    [110, 164.81, 246.94],
    [130.81, 196, 293.66],
    [87.31, 130.81, 220],
    [98, 146.83, 220],
  ]
  const voices = new Set<{ oscillator: OscillatorNode; gain: GainNode }>()
  let nextCycle = context.currentTime + 0.1
  let stopped = false

  function schedule() {
    if (stopped || nextCycle > context.currentTime + 12) return
    chords.forEach((chord, chordIndex) => {
      chord.forEach((frequency, voiceIndex) => {
        const start = nextCycle + chordIndex * 8
        const oscillator = context.createOscillator()
        const gain = context.createGain()
        oscillator.type = voiceIndex === 0 ? 'sine' : 'triangle'
        oscillator.frequency.value = frequency
        oscillator.detune.value = (voiceIndex - 1) * 4
        gain.gain.setValueAtTime(0, start)
        gain.gain.linearRampToValueAtTime(0.12, start + 3)
        gain.gain.linearRampToValueAtTime(0.08, start + 6)
        gain.gain.linearRampToValueAtTime(0, start + 10)
        oscillator.connect(gain)
        gain.connect(filter)
        const voice = { oscillator, gain }
        voices.add(voice)
        oscillator.onended = () => {
          oscillator.disconnect()
          gain.disconnect()
          voices.delete(voice)
        }
        oscillator.start(start)
        oscillator.stop(start + 10.1)
      })
    })
    nextCycle += 32
  }

  schedule()
  const timer = window.setInterval(schedule, 4000)
  return () => {
    if (stopped) return
    stopped = true
    window.clearInterval(timer)
    output.gain.value = 0
    voices.forEach(({ oscillator, gain }) => {
      oscillator.onended = null
      try {
        oscillator.stop()
      } catch {
        /* A scheduled voice may already have ended. */
      }
      oscillator.disconnect()
      gain.disconnect()
    })
    voices.clear()
    ;[filter, echo, feedback, wet, output].forEach((node) => node.disconnect())
  }
}
