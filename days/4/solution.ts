import { getInputLines } from '../../utils/read-input'

interface ICell {
  value: number
  marked: boolean
}
type IBoard = ICell[][]

async function main() {
  const lines = await getInputLines(__dirname)
  const numbersDrawn = lines[0].split(/,/).map(Number)
  const boards: IBoard[] = []

  for (let i = 2; i < lines.length; i += 6) {
    const boardLines = lines.slice(i, i + 5)
    const board = boardLines.map(line =>
      line
        .split(/\s+/)
        .map(Number)
        .map(value => ({
          value,
          marked: false,
        }))
    )
  }

  for (const numberDrawn of numbersDrawn) {
    for (const board of boards) {
      for (const row of board) {
        for (const cell of row) {
          if (cell.value === numberDrawn) {
            cell.marked = true
          }
        }

        const rowMarked = row.every(cell => cell.marked)

        if (rowMarked) {
          printScore({ board, numberDrawn })
          return
        }
      }

      for (const index in board) {
        const colMarked = board.every(row => row[index].marked)

        if (colMarked) {
          printScore({ board, numberDrawn })
          return
        }
      }
    }
  }
}

main()

interface ICalculateScoreOptions {
  board: IBoard
  numberDrawn: number
}

function printScore({ board, numberDrawn }: ICalculateScoreOptions) {
  const unmarkedSum = board
    .flat()
    .filter(cell => !cell.marked)
    .reduce((sum, cell) => sum + cell.value, 0)
  const score = unmarkedSum * numberDrawn

  console.log(score)
}
