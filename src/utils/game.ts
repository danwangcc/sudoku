import type { DifficultyType } from '@/types'
import sudoku from '@/utils/sudoku'
import { useBoardStore } from '@/stores/boardStore'

// 生成题目和答案
export const generateBoard = (difficulty: DifficultyType): void => {
    const boardStore = useBoardStore()

    const [newBoard, answerBoard] = sudoku.$generate(difficulty)
    for (let i = 0; i < boardStore.currentBoard.length; i++) {
        const nb = newBoard[i]!
        boardStore.initialBoard[i]!.value = Array.isArray(nb) ? [0] : nb
        boardStore.currentBoard[i]!.value = Array.isArray(nb) ? [0] : nb
    }
    boardStore.answerBoard = answerBoard
    boardStore.timer.startTime = Date.now()
}

// 判断这格是否为题目给出
export const getIsInit = (index: number): boolean => {
    const boardStore = useBoardStore()
    return typeof boardStore.initialBoard[index]?.value === 'number' ? true : false
}
