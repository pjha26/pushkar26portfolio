import assert from 'node:assert/strict'
import { createAmbientAudio } from '../lib/ambient-audio.ts'

// Exercise scheduling against a controllable audio clock, including a suspended tab.
let tick
let cleared = false
const nodes = []
const oscillators = []
globalThis.window = {
  setInterval(callback) {
    tick = callback
    return 1
  },
  clearInterval() {
    cleared = true
  },
}
function parameter() {
  return { value: 0, setValueAtTime() {}, linearRampToValueAtTime() {} }
}
function node() {
  const value = {
    gain: parameter(),
    frequency: parameter(),
    detune: parameter(),
    Q: parameter(),
    delayTime: parameter(),
    disconnected: false,
    connect() {},
    disconnect() {
      this.disconnected = true
    },
    start(time) {
      this.startTime = time
    },
    stop() {},
  }
  nodes.push(value)
  return value
}
const context = {
  currentTime: 0,
  destination: {},
  createGain: node,
  createBiquadFilter: node,
  createDelay: node,
  createOscillator() {
    const voice = node()
    oscillators.push(voice)
    return voice
  },
}
const stop = createAmbientAudio(context)
assert.equal(oscillators.length, 12)
for (let count = 0; count < 20; count++) tick()
assert.equal(oscillators.length, 12, 'A suspended audio clock must not accumulate voices')
context.currentTime = 24
tick()
assert.equal(oscillators.length, 24, 'Playback must schedule the next progression before a gap')
assert.ok(oscillators[12].startTime > context.currentTime)
stop()
stop()
assert.ok(cleared, 'Disabling sound must release the scheduler')
assert.ok(
  nodes.every((value) => value.disconnected),
  'Disabling sound must disconnect every node'
)
tick()
assert.equal(oscillators.length, 24, 'Disposed sessions must not schedule new voices')
delete globalThis.window
console.log('Ambient scheduling, suspension, and cleanup checks passed.')
