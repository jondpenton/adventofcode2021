import { getInputLines } from '../../utils/read-input'

const lineSegmentMatcher = /^(?<x1>\d+),(?<y1>\d+) -> (?<x2>\d+),(?<y2>\d+)$/

interface ICoordinate {
  x: number
  y: number
}

interface ILineSegment {
  start: ICoordinate
  end: ICoordinate
}

async function main() {
  const lines = await getInputLines(__dirname)
  const lineSegments = lines.map((line): ILineSegment => {
    const result = lineSegmentMatcher.exec(line)

    if (result === null) {
      throw new Error(`Error processing line segment ${line}`)
    }

    if (result.groups === undefined) {
      throw new Error(`Line segment groups not found`)
    }

    return {
      start: { x: Number(result.groups.x1), y: Number(result.groups.y1) },
      end: { x: Number(result.groups.x2), y: Number(result.groups.y2) },
    }
  })
  const verticalOrHorizontalLineSegments = lineSegments.filter(
    lineSegment =>
      lineSegment.start.x === lineSegment.end.x ||
      lineSegment.start.y === lineSegment.end.y
  )
  const commonPoints: ICoordinate[] = []

  for (let i = 0; i < verticalOrHorizontalLineSegments.length; i++) {
    const segment1 = verticalOrHorizontalLineSegments[i]
    const segment1Points = getLineSegmentPoints(segment1)

    for (let j = i + 1; j < verticalOrHorizontalLineSegments.length; j++) {
      const segment2 = verticalOrHorizontalLineSegments[j]
      const segment2Points = getLineSegmentPoints(segment2)

      for (const segment1Point of segment1Points) {
        for (const segment2Point of segment2Points) {
          if (
            segment1Point.x === segment2Point.x &&
            segment1Point.y === segment2Point.y &&
            !commonPoints.some(
              point =>
                point.x === segment1Point.x && point.y === segment1Point.y
            )
          ) {
            commonPoints.push(segment1Point)
          }
        }
      }
    }
  }

  console.log(commonPoints.length)
}

main()

function getLineSegmentPoints(lineSegment: ILineSegment): ICoordinate[] {
  const points: ICoordinate[] = [lineSegment.start]
  const isVertical = lineSegment.start.x === lineSegment.end.x

  if (isVertical) {
    let startPoint: ICoordinate
    let endPoint: ICoordinate

    if (lineSegment.start.y < lineSegment.end.y) {
      startPoint = lineSegment.start
      endPoint = lineSegment.end
    } else {
      startPoint = lineSegment.end
      endPoint = lineSegment.start
    }

    for (let y = startPoint.y; y < endPoint.y; y++) {
      points.push({
        x: startPoint.x,
        y,
      })
    }
  } else {
    let startPoint: ICoordinate
    let endPoint: ICoordinate

    if (lineSegment.start.x < lineSegment.end.x) {
      startPoint = lineSegment.start
      endPoint = lineSegment.end
    } else {
      startPoint = lineSegment.end
      endPoint = lineSegment.start
    }

    for (let x = startPoint.x; x < endPoint.x; x++) {
      points.push({
        x,
        y: startPoint.y,
      })
    }
  }

  return [...points, lineSegment.end]
}
