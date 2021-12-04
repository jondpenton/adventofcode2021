import { getInputLines } from '../../utils/read-input'

async function main() {
  const lines = await getInputLines(__dirname)
  let x = 0
  let depth = 0

  for (const line of lines) {
    const [command, numStr] = line.split(/\s/)
    const num = Number(numStr)

    switch (command) {
      case `forward`: {
        x += num
        break
      }
      case `down`: {
        depth += num
        break
      }
      case `up`: {
        depth -= num
        break
      }
    }
  }

  console.log(x * depth)
}

main()
