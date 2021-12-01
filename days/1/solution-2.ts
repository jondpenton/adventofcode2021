import path from 'path'
import fs from 'fs/promises'

async function main() {
  const inputStr = await fs.readFile(path.resolve(__dirname, `./input.txt`), {
    encoding: `utf-8`,
  })
  const measurements = inputStr
    .split(/[\n\r]/)
    .filter((line) => line !== ``)
    .map(Number)
  let increasedWindowMeasurementCount = 0

  for (let i = 3; i < measurements.length; i++) {
    const previousWindowMeasurement =
      measurements[i - 3] + measurements[i - 2] + measurements[i - 1]
    const windowMeasurement =
      measurements[i - 2] + measurements[i - 1] + measurements[i]

    if (previousWindowMeasurement < windowMeasurement) {
      increasedWindowMeasurementCount++
    }
  }

  console.log(increasedWindowMeasurementCount)
}

main()
