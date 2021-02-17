const { NeuralNetwork } = require('brain.js')

const network = new NeuralNetwork()

network.train([
  { input: [0, 1], output: [0] },
  { input: [1, 0], output: [1] },
])

const output = network.run([1, 0])

console.log(output)
