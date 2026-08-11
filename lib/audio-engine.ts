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
}

// Export a singleton instance
export const sound = new AudioEngine()
