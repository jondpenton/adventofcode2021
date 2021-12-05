import { getInputLines } from '../../utils/read-input'

async function main() {
  const lines = await getInputLines(__dirname)
  const [carbonBinaryStr] = filterLines({
    commonality: `least`,
    lines,
  })
  const carbonDecimal = getDecimalFromBinaryStr(carbonBinaryStr)
  const [oxygenBinaryStr] = filterLines({
    commonality: `most`,
    lines,
  })
  const oxygenDecimal = getDecimalFromBinaryStr(oxygenBinaryStr)

  console.log(carbonDecimal * oxygenDecimal)
}

main()

interface FilterLinesOptions {
  commonality: `most` | `least`
  lines: string[]
  index?: number
}

function filterLines({
  commonality,
  lines,
  index = 0,
}: FilterLinesOptions): string[] {
  if (index > lines[0].length - 1) {
    return lines
  }

  const binaryCount = [0, 0]

  for (const line of lines) {
    const char = line[index] as `0` | `1`
    binaryCount[char]++
  }

  let filterBit: string
  let newLines: string[]

  if (binaryCount[0] !== binaryCount[1]) {
    const leastCommonBit = binaryCount[0] < binaryCount[1] ? 0 : 1
    filterBit =
      commonality === `least`
        ? String(leastCommonBit)
        : String((leastCommonBit + 1) % 2)
    newLines = lines.filter((line) => line[index] === String(filterBit))
  } else {
    filterBit = commonality === `least` ? `0` : `1`
    newLines = lines.filter((line) => line[index] === filterBit)
  }

  if (newLines.length === 1) {
    return newLines
  }

  return filterLines({
    commonality,
    lines: newLines,
    index: index + 1,
  })
}

function getDecimalFromBinaryStr(binaryStr: string): number {
  return [...binaryStr].reduce((total, bitStr, index) => {
    if (bitStr === `0`) {
      return total
    }

    const power = binaryStr.length - 1 - index
    const multiplier = 2 ** power

    return total + multiplier
  }, 0)
}
