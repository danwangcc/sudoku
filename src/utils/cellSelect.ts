import type { BoardType, InputModeType, Position } from '@/types'
import { getRows, getCols, getBoxes } from '@/utils/boardFilter'

const emptyBoard = Array.from({ length: 81 }).map((item, index) => {
    return {
        id: index,
        row: ~~(index / 9),
        col: index % 9,
        value: [0] as number | number[],
    }
})

let selected: Position
let currentBoard: BoardType
let inputMode: InputModeType

// 初始化键盘监听
export const initKeyboard = (
    selectedT: Position,
    currentBoardT: BoardType,
    inputModeT: { value: InputModeType },
) => {
    selected = selectedT
    currentBoard = currentBoardT
    inputMode = inputModeT.value
}

// 切换输入模式 选择/备选
export const changeInputModeT = (inputModeT: InputModeType) => {
    inputMode = inputModeT
}

// 选中格子
export const select = (target: Position, selectedT: Position): void => {
    selected = selectedT
    selected.row = target.row
    selected.col = target.col
}

// 移动要选中的位置
const move = (direction: 'top' | 'down' | 'left' | 'right'): void => {
    let row: number
    let col: number
    switch (direction) {
        case 'top':
            row = Math.max(selected.row - 1, 0)
            col = selected.col
            break
        case 'down':
            row = Math.min(selected.row + 1, 8)
            col = selected.col
            break
        case 'left':
            row = selected.row
            col = Math.max(selected.col - 1, 0)
            break
        case 'right':
            row = selected.row
            col = Math.min(selected.col + 1, 8)
            break
    }
    select({ row, col }, selected)
}

// 选择数字 输入
export const handleInput = (inputNumber: number): void => {
    const index = selected.row * 9 + selected.col
    const current = currentBoard[index]!
    if (inputMode === 'exact') {
        current.value = inputNumber
        // 删除能'看见'的重复备选
        // 行
        const rows = getRows(currentBoard, selected.row, selected.col)
        rows.forEach((item) => {
            if (Array.isArray(item.value)) {
                const idx = item.value.indexOf(inputNumber)
                if (idx >= 0) item.value.splice(idx, 1)
            }
        })
        // 列
        const cols = getCols(currentBoard, selected.row, selected.col)
        cols.forEach((item) => {
            if (Array.isArray(item.value)) {
                const idx = item.value.indexOf(inputNumber)
                if (idx >= 0) item.value.splice(idx, 1)
            }
        })
        // 宫
        const boxes = getBoxes(currentBoard, selected.row, selected.col)
        boxes.forEach((item) => {
            if (Array.isArray(item.value)) {
                const idx = item.value.indexOf(inputNumber)
                if (idx >= 0) item.value.splice(idx, 1)
            }
        })
    } else {
        // 备选
        if (Array.isArray(current.value)) {
            const idx = (current.value as number[]).indexOf(inputNumber)
            if (idx >= 0) {
                ;(current.value as number[]).splice(idx, 1)
            } else {
                ;(current.value as number[]).push(inputNumber)
            }
        } else {
            current.value = [inputNumber]
        }
    }
}

// 删除已选
export const eraser = (): void => {
    const current = currentBoard[selected.row * 9 + selected.col]!
    current.value = [0]
}

// 键盘输入
let topMoveTimer: number
let downMoveTimer: number
let leftMoveTimer: number
let rightMoveTimer: number
const moveDelay = 200
document.addEventListener('keydown', (e) => {
    if (e.repeat === true) return
    switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
            clearInterval(topMoveTimer)
            clearInterval(downMoveTimer)
            move('top')
            topMoveTimer = setInterval(() => {
                move('top')
            }, moveDelay)
            return
        case 'KeyS':
        case 'ArrowDown':
            clearInterval(topMoveTimer)
            clearInterval(downMoveTimer)
            move('down')
            downMoveTimer = setInterval(() => {
                move('down')
            }, moveDelay)
            return
        case 'KeyA':
        case 'ArrowLeft':
            clearInterval(leftMoveTimer)
            clearInterval(rightMoveTimer)
            move('left')
            leftMoveTimer = setInterval(() => {
                move('left')
            }, moveDelay)
            return
        case 'KeyD':
        case 'ArrowRight':
            clearInterval(leftMoveTimer)
            clearInterval(rightMoveTimer)
            move('right')
            rightMoveTimer = setInterval(() => {
                move('right')
            }, moveDelay)
            return
        case 'Digit1':
        case 'Numpad1':
            handleInput(1)
            break
        case 'Digit2':
        case 'Numpad2':
            handleInput(2)
            break
        case 'Digit3':
        case 'Numpad3':
            handleInput(3)
            break
        case 'Digit4':
        case 'Numpad4':
            handleInput(4)
            break
        case 'Digit5':
        case 'Numpad5':
            handleInput(5)
            break
        case 'Digit6':
        case 'Numpad6':
            handleInput(6)
            break
        case 'Digit7':
        case 'Numpad7':
            handleInput(7)
            break
        case 'Digit8':
        case 'Numpad8':
            handleInput(8)
            break
        case 'Digit9':
        case 'Numpad9':
            handleInput(9)
            break
        case 'KeyQ':
            eraser()
            break
        case 'KeyE':
            break
        case 'KeyR':
            break
    }
})

document.addEventListener('keyup', (e) => {
    switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
            clearInterval(topMoveTimer)
            return
        case 'KeyS':
        case 'ArrowDown':
            clearInterval(downMoveTimer)
            return
        case 'KeyA':
        case 'ArrowLeft':
            clearInterval(leftMoveTimer)
            return
        case 'KeyD':
        case 'ArrowRight':
            clearInterval(rightMoveTimer)
            return
    }
})
