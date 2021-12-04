import { getInputLines } from '../../utils/read-input'

async function main() {
  const lines = await getInputLines(__dirname)
  let x = 0
  let z = 0
  let pitch = 0

  for (const line of lines) {
    const [command, numStr] = line.split(/\s/)
    const num = Number(numStr)

    switch (command) {
      case `forward`: {
        x += num
        z -= pitch * num
        break
      }
      case `down`: {
        pitch += num
        break
      }
      case `up`: {
        pitch -= num
        break
      }
    }
  }

  console.log(x * -z)
}

main()
