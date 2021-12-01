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
  let increasedMeasurementCount = 0

  for (let i = 1; i < measurements.length; i++) {
    const previousMeasurement = measurements[i - 1]
    const measurement = measurements[i]

    if (previousMeasurement < measurement) {
      increasedMeasurementCount++
    }
  }

  console.log(increasedMeasurementCount)
}

main()
