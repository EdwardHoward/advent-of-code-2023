const fs = require('node:fs')

const test = true
const input = fs.readFileSync(test ? './day-5/test.txt' : './day-5/input.txt').toString()

const lines = input//.split('\n')

const [seeds, ...rest] = lines.split(/\n\n/g).map(section => section.split(':')[1].trim().split(/\n/g))

const locations = []
seeds[0].split(' ').map(Number).forEach((seed) => {
  let lastVal = seed

  for (const map of rest) {
    for (const line of map) {
      const [destination, source, range] = line.split(' ').map(Number)

      if (lastVal >= source && lastVal <= source + range) {

        lastVal = destination + (lastVal - source)

        break
      }
    }
  }

  locations.push(lastVal)
})

console.log(locations)

// const convertors = rest.reverse().reduce((agg, value) => {
//   const seedToSoilConvert = {}

//   value.forEach(line => {
//     const [destination, source, range] = line.split(' ').map(Number)

//     for (var i = 0; i < range; i++) {
//       if (!agg.at(-1) || agg.at(-1)[source + i]) {
//         seedToSoilConvert[destination + i] = source + i
//       }
//     }
//   })

//   agg.push(seedToSoilConvert)

//   return agg
// }, [])

// const locations = []

// seeds[0].split(' ').map(Number).forEach((seed) => {
//   let lastVal = seed

//   for (var convertor of convertors) {
//     lastVal = convertor[lastVal] === undefined ? lastVal : convertor[lastVal]
//   }

//   locations.push(lastVal)
// })

// console.log(locations)

// const seedToSoilRealConvert = {}

// const convertors = rest.reduce((agg, value) => {
//   const seedToSoilConvert = {}

//   value.forEach(line => {
//     const [destination, source, range] = line.split(' ').map(Number)

//     const sourceConvertor = agg.at(-1)

//     for (var i = 0; i < range; i++) {
//       if (agg.length < 1) {
//         seedToSoilRealConvert[source + i] = destination + i
//         if (seeds[0].split(' ').map(Number).includes(source + i)) {
//           seedToSoilConvert[destination + i] = source + i
//         }

//         continue
//       }

//       if (sourceConvertor[source + i] !== undefined) {
//         // seedToSoilConvert[source + i] = destination + i
//         seedToSoilConvert[destination + i] = source + i
//       }
//     }
//   })

//   const newValues = Object.keys(agg.at(-1) || {}).reduce((add, value) => {
//     add[Number(value)] = Number(value)

//     return add
//   }, {})
//   agg.push({ ...newValues || {}, ...seedToSoilConvert })

//   return agg
// }, [])

// const locations = []



// console.log(locations)

// console.log(locations.map(val => seedToSoilRealConvert[val] === undefined ? val : seedToSoilRealConvert[val]))

//console.log(seedToSoil)

console.log(Math.min(...locations))
debugger