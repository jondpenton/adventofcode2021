import { getInputLines } from '../../utils/read-input'

interface ICell {
  value: number
  marked: boolean
}
interface IBoard {
  rows: ICell[][]
  won: boolean
}

async function main() {
  const lines = await getInputLines(__dirname)
  const numbersDrawn = lines[0].split(/,/).map(Number)
  const boards: IBoard[] = []

  for (let i = 2; i < lines.length; i += 6) {
    const boardLines = lines.slice(i, i + 5)
    const board: IBoard = {
      rows: boardLines.map(line =>
        line
          .split(/\s+/)
          .map(Number)
          .map(value => ({
            value,
            marked: false,
          }))
      ),
      won: false,
    }
    boards.push(board)
  }

  let unWonBoards = boards.filter(board => !board.won)

  for (const numberDrawn of numbersDrawn) {
    for (const board of unWonBoards) {
      for (const row of board.rows) {
        for (const cell of row) {
          if (cell.value === numberDrawn) {
            cell.marked = true
          }
        }

        const rowMarked = row.every(cell => cell.marked)

        if (rowMarked) {
          if (unWonBoards.length === 1) {
            printScore({ board: unWonBoards[0], numberDrawn })
            return
          }

          board.won = true
        }
      }

      for (const index in board.rows) {
        const colMarked = board.rows.every(row => row[index].marked)

        if (colMarked) {
          if (unWonBoards.length === 1) {
            printScore({ board: unWonBoards[0], numberDrawn })
            return
          }

          board.won = true
        }
      }

      if (board.won) {
        unWonBoards = unWonBoards.filter(board => !board.won)
      }
    }
  }
}

main()

interface IPrintScoreOptions {
  board: IBoard
  numberDrawn: number
}

function printScore({ board, numberDrawn }: IPrintScoreOptions) {
  const unmarkedSum = board.rows
    .flat()
    .filter(cell => !cell.marked)
    .reduce((sum, cell) => sum + cell.value, 0)
  const score = unmarkedSum * numberDrawn

  console.log(score)
}
