import { getInputLines } from '../../utils/read-input'

async function main() {
  const lines = await getInputLines(__dirname)
  let epsilon = 0
  let gamma = 0

  for (let power = 0; power < lines[0].length; power++) {
    const index = lines[0].length - power - 1
    const binaryCount = [0, 0]

    for (const line of lines) {
      const char = line[index] as `0` | `1`
      binaryCount[char]++
    }

    const leastCommonBit = binaryCount[0] < binaryCount[1] ? 0 : 1
    const mostCommonBit = (leastCommonBit + 1) % 2
    const multiplier = 2 ** power
    epsilon += leastCommonBit * multiplier
    gamma += mostCommonBit * multiplier
  }

  console.log(epsilon * gamma)
}

main()
