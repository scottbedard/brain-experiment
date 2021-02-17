const { NeuralNetwork } = require('brain.js')
const fs = require('fs')
const path = require('path')

// generate a 1 or 0
const coinflip = () => Math.random() > 0.5 ? 1 : 0

// generate an array of coinflips
const seed = (length = 5) => new Array(length).fill().map(coinflip)

// create a network to output the first value of an array
// this should demonstrates the coorelation of data sizes
// 10 -> 0.7598074078559875
// 100 -> 0.9256471991539001
// 1000 -> 0.9508631825447083
// 10000 -> 0.9802496433258057
// 100000 -> 0.9930176138877869
// 1000000 -> 0.9974836707115173
// 5000000 -> 0.9991652965545654
const network = new NeuralNetwork()

const dataSize = 5000000

const train = () => {
  console.log()
  console.log('Network: NEW')

  network.train(
    new Array(dataSize).fill().map(() => {
      const first = coinflip()
  
      return {
        input: [first, ...seed()],
        output: [first]
      }
    })
  )

  fs.writeFileSync(
    path.resolve(__dirname, './model.json'),
    JSON.stringify({ dataSize, network: network.toJSON() })
  )
}

console.log()
console.log(`Data size: ${dataSize}`)

if (fs.existsSync(path.resolve(__dirname, './model.json'))) {
  const model = require('./model.json')

  if (model.dataSize === dataSize) {
    console.log()
    console.log('Network: CACHED')
    network.fromJSON(model.network)
  } else {
    train();
  }
} else {
  train()
}

// test the network
const output = network.run([1].concat(seed()))

console.log()
console.log(`Output: ${output}`)
console.log()