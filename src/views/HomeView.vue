<script setup lang="ts">
import Tab from '@/components/TabComp.vue'
import Cell from '@/components/CellComp.vue'
import Popup from '@/components/PopupComp.vue'
import { reactive, ref } from 'vue'
import { getRows, getCols, getBoxes } from '@/utils/boardFilter'
import { handleInput } from '@/utils/cellSelect'
import { useBoardStore } from '@/stores/boardStore.ts'
import { getIsInit } from '@/utils/game'

const boardStore = useBoardStore()

// 此格是否直接出错（行 列 宫 重复）
function getIsError({ row, col, value }: { row: number; col: number; value: number }): boolean {
    if (typeof value !== 'number') return false

    // 行
    const rows = getRows(boardStore.currentBoard, row, col)
    if (rows.findIndex((item) => item.value === value) >= 0) return true

    // 列
    const cols = getCols(boardStore.currentBoard, row, col)
    if (cols.findIndex((item) => item.value === value) >= 0) return true

    // 宫
    const boxs = getBoxes(boardStore.currentBoard, row, col)
    if (boxs.findIndex((item) => item.value === value) >= 0) return true
    return false
}

function getIsAssociated({ row, col }: { row: number; col: number }): boolean {
    if (row === boardStore.selected.row || col === boardStore.selected.col) return true

    const boxs = getBoxes(boardStore.currentBoard, row, col)
    if (
        boxs.findIndex((item) => {
            return item.row === boardStore.selected.row && item.col === boardStore.selected.col
        }) >= 0
    ) {
        return true
    }
    return false
}
</script>

<template>
    <div class="layout">
        <div class="tab">
            <Tab />
        </div>

        <div class="box">
            <div class="cell-box" v-for="item in boardStore.currentBoard" :key="item.id">
                <Cell
                    @click="boardStore.select(item, boardStore.selected)"
                    :row="item.row"
                    :col="item.col"
                    :selectedValue="item.value"
                    :isSelect="
                        boardStore.selected.row === item.row && boardStore.selected.col === item.col
                    "
                    :isInit="getIsInit(item.id)"
                    :isError="getIsError(item)"
                    :isSameAsSelected="item.value === boardStore.selectedValue"
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
            <div @click="boardStore.eraser">
                <img src="@/assets/editor-eraser.svg" alt="eraser" />
                <div class="key">Q</div>
            </div>
            <div
                @click="boardStore.changeInputMode"
                :style="{ background: boardStore.inputMode === 'exact' ? '' : '#11451419' }"
            >
                <img src="@/assets/note.svg" alt="note" />
                <div class="key">E</div>
            </div>
            <div @click="boardStore.refresh">
                <img src="@/assets/refresh.svg" alt="refresh" />
                <div class="key">R</div>
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
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .tab {
        width: 540px;
    }

    .box {
        display: grid;
        grid-template-columns: repeat(9, 1fr);
        grid-template-rows: repeat(9, 1fr);
        cursor: pointer;
        user-select: none;
        width: 540px;
        height: 540px;
        margin: 15px auto;

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

            .key {
                border: 1px solid black;
                font-weight: bold;
                width: 1.1em;
                height: 1.1em;
            }
        }
    }

    .description {
        width: 540px;
        padding: 10px;
        font-size: 1.2rem;
    }
}

@media (max-width: 540px) {
    .layout {
        width: 100vw;
        overflow: hidden;

        .tab {
            width: 100%;
        }

        .box {
            width: 95vw;
            height: 95vw;
            min-height: 320px;
            font-size: 0.8em;

            .cell-box {
                width: 100%;
                height: 100%;
            }
        }

        .panel {
            width: 95vw;
            height: 10vw;
            font-size: 4vw;

            .inputNumber {
                width: 10.6vw;
                height: 100%;
            }
        }

        .tool {
            width: 95vw;
            height: 10vw;

            div {
                margin: 0 0px;
                height: 100%;
                width: 40px;

                img {
                    height: 6vw;
                }

                .key {
                    display: none;
                }
            }
        }

        .description {
            width: 95vw;
        }
    }
}
</style>
