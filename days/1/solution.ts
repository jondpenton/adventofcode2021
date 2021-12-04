import { getInputLines } from '../../utils/read-input'

async function main() {
  const lines = await getInputLines(__dirname)
  const measurements = lines.map(Number)
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
