import type { BoardType } from '@/types'

export const getRows = (currentBoard: BoardType, row: number, col: number) => {
    return currentBoard.filter((item, index) => {
        return index !== row * 9 + col && item.row === row
    })
}

export const getCols = (currentBoard: BoardType, row: number, col: number) => {
    return currentBoard.filter((item, index) => {
        return index !== row * 9 + col && index % 9 === col
    })
}

export const getBoxes = (currentBoard: BoardType, row: number, col: number) => {
    const rowStart = ~~(row / 3) * 3
    const colStart = ~~(col / 3) * 3
    return currentBoard.filter((item, index) => {
        return (
            index !== row * 9 + col && // 去掉这一格
            item.row >= rowStart &&
            item.row < rowStart + 3 &&
            item.col >= colStart &&
            item.col < colStart + 3
        )
    })
}
