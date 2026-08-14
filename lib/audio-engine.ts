'use client'

class AudioEngine {
  private ctx: AudioContext | null = null
  private enabled = false
  private droneOsc: OscillatorType | null = null
  private droneGain: GainNode | null = null
  private droneActive = false

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  private startDrone() {
    if (!this.ctx || !this.enabled || this.droneActive) return

    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'sine'
    // Low frequency drone
    osc.frequency.setValueAtTime(45, this.ctx.currentTime)
    
    // Add some slow LFO modulation to frequency for an eerie breathing effect
    const lfo = this.ctx.createOscillator()
    lfo.type = 'sine'
    lfo.frequency.setValueAtTime(0.1, this.ctx.currentTime) // Very slow
    const lfoGain = this.ctx.createGain()
    lfoGain.gain.setValueAtTime(5, this.ctx.currentTime) // Modulate frequency by +/- 5Hz
    
    lfo.connect(lfoGain)
    lfoGain.connect(osc.frequency)
    lfo.start()

    gain.gain.setValueAtTime(0, this.ctx.currentTime)
    // Very quiet, ambient hum
    gain.gain.linearRampToValueAtTime(0.02, this.ctx.currentTime + 2)

    osc.connect(gain)
    gain.connect(this.ctx.destination)

    osc.start()
    this.droneGain = gain
    // Store as any since typescript might complain about the custom prop, or just keep it active
    ;(osc as any).lfo = lfo
    ;(osc as any).lfoGain = lfoGain
    
    this.droneActive = true
  }

  private stopDrone() {
    if (!this.ctx || !this.droneGain || !this.droneActive) return
    
    // Fade out
    this.droneGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1)
    setTimeout(() => {
      this.droneActive = false
    }, 1000)
  }

  enable() {
    this.enabled = true
    this.init()
    this.startDrone()
  }

  disable() {
    this.enabled = false
    this.stopDrone()
  }

  toggle() {
    if (this.enabled) this.disable()
    else this.enable()
    return this.enabled
  }

  isEnabled() {
    return this.enabled
  }

  private createOscillator(type: OscillatorType, freq: number, duration: number, vol: number) {
    if (!this.ctx || !this.enabled) return

    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = type
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime)

    gain.gain.setValueAtTime(vol, this.ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration)

    osc.connect(gain)
    gain.connect(this.ctx.destination)

    osc.start()
    osc.stop(this.ctx.currentTime + duration)
  }

  playHover() {
    // A digital "blip"
    this.createOscillator('sine', 1200, 0.05, 0.05)
    setTimeout(() => this.createOscillator('sine', 1800, 0.05, 0.03), 20)
  }

  playKeystroke() {
    // Mechanical click
    this.createOscillator('square', 300, 0.02, 0.02)
  }

  playAccessGranted() {
    // Success chime
    this.createOscillator('sine', 880, 0.1, 0.1)
    setTimeout(() => this.createOscillator('sine', 1108, 0.2, 0.1), 100)
    setTimeout(() => this.createOscillator('sine', 1318, 0.4, 0.1), 200)
  }

  playGlitch() {
    if (!this.ctx || !this.enabled) return
    // Dissonant aggressive sound
    const osc1 = this.ctx.createOscillator()
    const osc2 = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    
    osc1.type = 'sawtooth'
    osc2.type = 'square'
    osc1.frequency.setValueAtTime(150, this.ctx.currentTime)
    osc2.frequency.setValueAtTime(160, this.ctx.currentTime)
    
    // Frequency modulation for glitch effect
    osc1.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.2)
    osc2.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.4)

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 1.0)

    osc1.connect(gain)
    osc2.connect(gain)
    gain.connect(this.ctx.destination)

    osc1.start()
    osc2.start()
    osc1.stop(this.ctx.currentTime + 1.0)
    osc2.stop(this.ctx.currentTime + 1.0)
  }

  playBootTick() {
    // Quick low mechanical relay tick
    this.createOscillator('square', 180, 0.03, 0.04)
    setTimeout(() => this.createOscillator('sine', 400, 0.02, 0.02), 10)
  }

  playBootComplete() {
    // Rising 3-note power-up chime with longer sustain
    this.createOscillator('sine', 523, 0.15, 0.08)
    setTimeout(() => this.createOscillator('sine', 659, 0.2, 0.08), 120)
    setTimeout(() => this.createOscillator('sine', 784, 0.4, 0.1), 240)
    setTimeout(() => this.createOscillator('triangle', 1568, 0.3, 0.04), 360)
  }

  playNavClick() {
    // Short clean "pip" — higher-pitched than hover
    this.createOscillator('sine', 2000, 0.04, 0.06)
    setTimeout(() => this.createOscillator('triangle', 2400, 0.03, 0.03), 15)
  }

  playCardFlip() {
    if (!this.ctx || !this.enabled) return
    // Wooshy sweep — fast frequency up then down
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(200, this.ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.08)
    osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.2)

    gain.gain.setValueAtTime(0.06, this.ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25)

    osc.connect(gain)
    gain.connect(this.ctx.destination)

    osc.start()
    osc.stop(this.ctx.currentTime + 0.25)
  }

  playThemeSwitch() {
    if (!this.ctx || !this.enabled) return
    // Modulated warble — mid-freq morphing tone
    const osc1 = this.ctx.createOscillator()
    const osc2 = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc1.type = 'sine'
    osc2.type = 'triangle'
    osc1.frequency.setValueAtTime(600, this.ctx.currentTime)
    osc2.frequency.setValueAtTime(605, this.ctx.currentTime) // Slight detuning for warble

    osc1.frequency.linearRampToValueAtTime(900, this.ctx.currentTime + 0.2)
    osc2.frequency.linearRampToValueAtTime(895, this.ctx.currentTime + 0.2)

    gain.gain.setValueAtTime(0.06, this.ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.35)

    osc1.connect(gain)
    osc2.connect(gain)
    gain.connect(this.ctx.destination)

    osc1.start()
    osc2.start()
    osc1.stop(this.ctx.currentTime + 0.35)
    osc2.stop(this.ctx.currentTime + 0.35)
  }

  playSectionReveal() {
    if (!this.ctx || !this.enabled) return
    // Low sub-bass rumble pulse — very subtle
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(55, this.ctx.currentTime)
    osc.frequency.linearRampToValueAtTime(35, this.ctx.currentTime + 0.4)

    gain.gain.setValueAtTime(0, this.ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 0.05)
    gain.gain.linearRampToValueAtTime(0.03, this.ctx.currentTime + 0.2)
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4)

    osc.connect(gain)
    gain.connect(this.ctx.destination)

    osc.start()
    osc.stop(this.ctx.currentTime + 0.4)
  }

  playScrollTop() {
    // Ascending two-note whistle
    this.createOscillator('sine', 800, 0.12, 0.06)
    setTimeout(() => this.createOscillator('sine', 1200, 0.15, 0.06), 100)
  }

  playError() {
    if (!this.ctx || !this.enabled) return
    // Low dissonant buzz for invalid commands
    const osc1 = this.ctx.createOscillator()
    const osc2 = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc1.type = 'sawtooth'
    osc2.type = 'square'
    osc1.frequency.setValueAtTime(100, this.ctx.currentTime)
    osc2.frequency.setValueAtTime(107, this.ctx.currentTime) // Dissonant interval

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3)

    osc1.connect(gain)
    osc2.connect(gain)
    gain.connect(this.ctx.destination)

    osc1.start()
    osc2.start()
    osc1.stop(this.ctx.currentTime + 0.3)
    osc2.stop(this.ctx.currentTime + 0.3)
  }

  playWhoosh() {
    if (!this.ctx || !this.enabled) return
    // Quick filtered noise sweep for UI transitions
    const bufferSize = this.ctx.sampleRate * 0.15
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize) // Decaying noise
    }

    const source = this.ctx.createBufferSource()
    source.buffer = buffer

    const filter = this.ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(2000, this.ctx.currentTime)
    filter.frequency.exponentialRampToValueAtTime(500, this.ctx.currentTime + 0.15)
    filter.Q.setValueAtTime(2, this.ctx.currentTime)

    const gain = this.ctx.createGain()
    gain.gain.setValueAtTime(0.06, this.ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15)

    source.connect(filter)
    filter.connect(gain)
    gain.connect(this.ctx.destination)

    source.start()
  }
}

// Export a singleton instance
export const sound = new AudioEngine()
