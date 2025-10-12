import { getRows, getCols, getBoxes } from '@/utils/boardFilter'
import { useBoardStore } from '@/stores/boardStore'
import { getIsInit } from './game'

// 移动要选中的位置
const move = (direction: 'top' | 'down' | 'left' | 'right'): void => {
    const boardStore = useBoardStore()
    let row: number
    let col: number
    switch (direction) {
        case 'top':
            row = Math.max(boardStore.selected.row - 1, 0)
            col = boardStore.selected.col
            break
        case 'down':
            row = Math.min(boardStore.selected.row + 1, 8)
            col = boardStore.selected.col
            break
        case 'left':
            row = boardStore.selected.row
            col = Math.max(boardStore.selected.col - 1, 0)
            break
        case 'right':
            row = boardStore.selected.row
            col = Math.min(boardStore.selected.col + 1, 8)
            break
    }
    boardStore.select({ row, col })
}

// 判断是否成功
export const getIsComplete = (): boolean => {
    const boardStore = useBoardStore()
    for (let i = 0; i < boardStore.currentBoard.length; i++) {
        if (boardStore.currentBoard[i]?.value !== boardStore.answerBoard[i]) return false
    }
    return true
}

// 选择数字 输入
export const handleInput = (inputNumber: number): void => {
    const boardStore = useBoardStore()
    const index = boardStore.selected.row * 9 + boardStore.selected.col

    // 题目已给的数字不可修改
    if (getIsInit(index)) return

    const current = boardStore.currentBoard[index]!
    if (boardStore.inputMode === 'exact') {
        current.value = inputNumber

        if (getIsComplete()) {
            setTimeout(() => {
                const time = Date.now()
                boardStore.timer.endTime = time
                boardStore.timer.totalTime = time - boardStore.timer.startTime
                const minites = Math.floor(boardStore.timer.totalTime / 60000)
                const seconds = Math.floor((boardStore.timer.totalTime % 60000) / 1000)
                console.log(minites, seconds)
                alert(`成功！\n用时: ${minites}分${seconds}秒`)
            }, 200)
        }

        // 删除能'看见'的重复备选
        // 行
        const rows = getRows(
            boardStore.currentBoard,
            boardStore.selected.row,
            boardStore.selected.col,
        )
        rows.forEach((item) => {
            if (Array.isArray(item.value)) {
                const idx = item.value.indexOf(inputNumber)
                if (idx >= 0) item.value.splice(idx, 1)
            }
        })
        // 列
        const cols = getCols(
            boardStore.currentBoard,
            boardStore.selected.row,
            boardStore.selected.col,
        )
        cols.forEach((item) => {
            if (Array.isArray(item.value)) {
                const idx = item.value.indexOf(inputNumber)
                if (idx >= 0) item.value.splice(idx, 1)
            }
        })
        // 宫
        const boxes = getBoxes(
            boardStore.currentBoard,
            boardStore.selected.row,
            boardStore.selected.col,
        )
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

// 键盘输入
let topMoveTimer: number
let downMoveTimer: number
let leftMoveTimer: number
let rightMoveTimer: number
const moveDelay = 200
let isListenning = false
export const initKeyboard = () => {
    if (isListenning) return
    isListenning = true
    const boardStore = useBoardStore()
    window.solve = boardStore.solve

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
                boardStore.eraser()
                break
            case 'KeyE':
                boardStore.changeInputMode()
                break
            case 'KeyR':
                boardStore.refresh()
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
}

// 阻止右键菜单
window.oncontextmenu = function () {
    return false
}
