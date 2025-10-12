<script setup lang="ts">
import { reactive, ref, defineEmits } from 'vue'
import { useBoardStore } from '@/stores/boardStore.ts'
import type { DifficultyType } from '@/types'
import { generateBoard } from '@/utils/game'

const boardStore = useBoardStore()

const difficulties = reactive(['easy', 'medium', 'hard', 'very-hard', 'insane', 'inhuman'])
const difficulty = ref('easy')

// 开局
function newGame(target?: DifficultyType): void {
    if (target === difficulty.value) return
    if (boardStore.isGaming) {
        // 已开局
        if (confirm(`你要重开一局吗?\n难度: ${target ?? difficulty.value}`)) {
            if (target) difficulty.value = target
            generateBoard(difficulty.value)
        }
    } else {
        // 未开局
        if (target) {
            difficulty.value = target
        } else {
            boardStore.isGaming = true
            generateBoard(difficulty.value)
        }
    }
}
</script>

<template>
    <div class="tab">
        <div
            class="tabItem"
            :class="{ active: item === difficulty }"
            v-for="item in difficulties"
            :key="item"
            @click="newGame(item)"
        >
            {{ item }}
        </div>
        <div class="newGame" @click="newGame()">
            <img src="@/assets/start.svg" alt="" />
            <span>New Game!</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.tab {
    display: flex;
    width: 540px;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
    user-select: none;
    font-size: 1em;
    background: #fff8f0;
    border-bottom: 2px solid #a2c8e8;

    .tabItem {
        transition: all 0.1s linear;
        padding: 0 10px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-radius: 50% 50% 0 0;
    }

    .active {
        background: #a2c8e8;
        color: #fff1d7;
        font-weight: bold;
        font-size: 1.2em;
        text-shadow: 1px 1px black;
    }

    .newGame {
        display: flex;
        justify-content: space-around;
        align-items: center;
        background: #ffffff;
        border: 1px solid black;

        img {
            height: 1.5em;
        }
    }
}
</style>
