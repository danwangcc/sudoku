<script setup lang="ts">
import Cell from '@/components/CellComp.vue'
import { reactive, ref, computed, withDefaults } from 'vue'
import { getRows, getCols, getBoxes } from '@/utils/boardFilter'
import { select, initKeyboard, handleInput, changeInputModeT, eraser } from '@/utils/cellSelect'
import type { BoardType } from '@/types'

const emptyBoard = Array.from({ length: 81 }).map((item, index) => {
    return {
        id: index,
        row: ~~(index / 9),
        col: index % 9,
        value: [0] as number | number[],
    }
})

const currentBoard: BoardType = reactive(JSON.parse(JSON.stringify(emptyBoard)))

// 输入模式：选择/备选
const inputMode = ref('exact')

// 选中的格子坐标
const selected = reactive<{
    row: number
    col: number
}>({
    row: 0,
    col: 0,
})
initKeyboard(selected, currentBoard, inputMode)

// 选中的格子的值
const selectedValue = computed(() => {
    return currentBoard[selected.row * 9 + selected.col].value
})

// 切换输入模式
function changeInputMode(): void {
    inputMode.value = inputMode.value === 'exact' ? 'alternative' : 'exact'
    changeInputModeT(inputMode.value)
}

// 删除所有
function refresh(): void {
    currentBoard.splice(0, currentBoard.length, ...JSON.parse(JSON.stringify(emptyBoard)))
}

// 此格是否直接出错（行 列 宫 重复）
function getIsError({ row, col, value }: { row: number; col: number; value: number }): boolean {
    if (typeof value !== 'number') return false

    // 行
    const rows = getRows(currentBoard, row, col)
    if (rows.findIndex((item) => item.value === value) >= 0) return true

    // 列
    const cols = getCols(currentBoard, row, col)
    if (cols.findIndex((item) => item.value === value) >= 0) return true

    // 宫
    const boxs = getBoxes(currentBoard, row, col)
    if (boxs.findIndex((item) => item.value === value) >= 0) return true
    return false
}

function getIsAssociated({ row, col }: { row: number; col: number }): boolean {
    if (row === selected.row || col === selected.col) return true

    const boxs = getBoxes(currentBoard, row, col)
    if (
        boxs.findIndex((item) => {
            return item.row === selected.row && item.col === selected.col
        }) >= 0
    ) {
        return true
    }
    return false
}
</script>

<template>
    <div class="layout">
        <div class="box">
            <div class="cell-box" :class="1" v-for="item in currentBoard" :key="item.id">
                <Cell
                    :row="item.row"
                    :col="item.col"
                    :isSelect="selected.row === item.row && selected.col === item.col"
                    @click="select(item, selected)"
                    :selectedValue="item.value"
                    :isError="getIsError(item)"
                    :isSameAsSelected="item.value === selectedValue"
                    :isAssociated="getIsAssociated(item)"
                />
            </div>
        </div>
        <div class="panel">
            <div
                class="inputNumber"
                v-for="item in 9"
                :key="item"
                @click="handleInput(item, inputMode)"
            >
                {{ item }}
            </div>
        </div>
        <div class="tool">
            <div @click="eraser">
                <img src="@/assets/editor-eraser.svg" alt="eraser" />
                <span>Q</span>
            </div>
            <div
                @click="changeInputMode"
                :style="{ background: inputMode === 'exact' ? '' : '#11451419' }"
            >
                <img src="@/assets/note.svg" alt="note" />
                <span>E</span>
            </div>
            <div @click="refresh">
                <img src="@/assets/refresh.svg" alt="refresh" />
                <span>R</span>
            </div>
        </div>
        <div class="description">
            <img width="40" src="@/assets/WASD.svg" alt="WASD" />
            <span>支持↑↓←→和WASD, 数字和小键盘</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.layout {
    display: flex;
    flex-direction: column;
    align-items: center;

    .box {
        display: grid;
        grid-template-columns: repeat(9, 1fr);
        grid-template-rows: repeat(9, 1fr);
        cursor: pointer;
        user-select: none;
        width: 540px;
        height: 540px;
        margin: 15px auto;
        border: 1px rgb(77, 77, 223) solid;

        .cell-box {
            width: 60px;
            height: 60px;
        }
    }

    .panel {
        height: 60px;
        width: 540px;
        background: #d6e6f1;
        display: flex;

        .inputNumber {
            width: 60px;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 2em;
            cursor: pointer;
            user-select: none;
            border: 0.5px dashed #3b88c5;
        }
    }

    .tool {
        height: 60px;
        width: 540px;
        background: #e6f1f8;
        display: flex;

        div {
            margin: 0 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            height: 100%;
            width: 40px;
            border-radius: 30%;

            img {
                height: 30px;
            }
        }
    }

    .description {
        width: 540px;
        padding: 10px;
        font-size: 1.2rem;
    }
}
</style>
