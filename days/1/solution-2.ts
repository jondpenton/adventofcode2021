import { getInputLines } from '../../utils/read-input'

async function main() {
  const lines = await getInputLines(__dirname)
  const measurements = lines.map(Number)
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
