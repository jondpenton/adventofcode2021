import fs from 'fs/promises'
import path from 'path'

export async function getInputLines(dirname: string) {
  const inputPath = path.resolve(dirname, `./input.txt`)
  const input = await fs.readFile(inputPath, {
    encoding: `utf-8`,
  })
  const lines = input
    .trim()
    .split(/\n/)
    .map(line => line.trim())

  return lines
}
