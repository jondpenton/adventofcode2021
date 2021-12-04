import { getInputLines } from '../../utils/read-input'

async function main() {
  const lines = await getInputLines(__dirname)
  let x = 0
  let depth = 0
  let aim = 0

  for (const line of lines) {
    const [command, numStr] = line.split(/\s/)
    const num = Number(numStr)

    switch (command) {
      case `forward`: {
        x += num
        depth += aim * num
        break
      }
      case `down`: {
        aim += num
        break
      }
      case `up`: {
        aim -= num
        break
      }
    }
  }

  console.log(x * depth)
}

main()
