const { NeuralNetwork } = require('brain.js')

// generate a 1 or 0
const coinflip = () => Math.random() > 0.5 ? 1 : 0

// generate an array of coinflips
const seed = (length = 5) => new Array(length).fill().map(coinflip)


// train a network to output the first value of an array
// this output will become more accurate with more data
// 10 -> 0.7598074078559875
// 100 -> 0.9256471991539001
// 1000 -> 0.9508631825447083
// 10000 -> 0.9802496433258057
// 100000 -> 0.9930176138877869
// 1000000 -> 0.9974836707115173
const network = new NeuralNetwork()

const data = new Array(1000)
  .fill()
  .map(() => {
    const first = coinflip()

    return {
      input: [first, ...seed()],
      output: [first]
    }
  })

network.train(data)

const output = network.run([1].concat(seed()))

console.log(output)
