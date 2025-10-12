import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { BoardType, InputModeType, Position } from '@/types'
import { getIsInit } from '@/utils/game'

export const useBoardStore = defineStore('board', () => {
    // 空棋盘
    const emptyBoard = Array.from({ length: 81 }).map((item, index) => {
        return {
            id: index,
            row: ~~(index / 9),
            col: index % 9,
            value: [0] as number | number[],
        }
    })
    // 生成的初始化棋盘
    const initialBoard = reactive<BoardType>(JSON.parse(JSON.stringify(emptyBoard)))
    // 当前棋盘
    const currentBoard = reactive<BoardType>(JSON.parse(JSON.stringify(emptyBoard)))
    // 答案
    const answerBoard = ref<number[]>(Array.from({ length: 81 }))
    // 直接完成
    const solve = (): void => {
        if (!isGaming.value) return
        currentBoard.forEach((item, index) => {
            item.value = answerBoard.value[index]!
        })
    }

    // 是否正在游戏
    const isGaming = ref(false)

    // 当前选中的格子坐标
    const selected = reactive<Position>({
        row: 0,
        col: 0,
    })
    // 选中格子
    const select = (target: Position): void => {
        selected.row = target.row
        selected.col = target.col
    }
    // 选中的格子的值
    const selectedValue = computed(() => {
        return currentBoard[selected.row * 9 + selected.col]?.value
    })

    // 输入模式
    const inputMode = ref<InputModeType>('exact')
    // 切换输入模式 选择/备选
    const changeInputMode = () => {
        inputMode.value = inputMode.value === 'exact' ? 'candidate' : 'exact'
    }

    // 删除已选
    const eraser = (): void => {
        const index = selected.row * 9 + selected.col
        // 题目已给的数字不可修改
        if (getIsInit(index)) return

        const current = currentBoard[index]!
        current.value = [0]
    }
    // 重置棋盘
    const refresh = (): void => {
        if (!confirm('确定要重置吗?')) return
        currentBoard.splice(0, currentBoard.length, ...JSON.parse(JSON.stringify(initialBoard)))
    }

    // 起止时间
    const timer = reactive({
        startTime: 0,
        endTime: 0,
        totalTime: 0,
    })

    return {
        emptyBoard,
        initialBoard,
        currentBoard,
        answerBoard,
        solve,
        isGaming,
        selected,
        select,
        selectedValue,
        inputMode,
        changeInputMode,
        eraser,
        refresh,
        timer,
    }
})
