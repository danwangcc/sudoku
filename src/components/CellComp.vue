<script setup lang="ts">
import { defineProps, computed } from 'vue'

const props = defineProps<{
    row: number
    col: number
    isSelect: boolean
    isInit: boolean
    selectedValue: number | number[]
    isError: boolean
    isSameAsSelected: boolean
    isAssociated: boolean
}>()

const isExact = computed(() => typeof props.selectedValue === 'number' && props.selectedValue !== 0)

const style = computed(() => ({
    background: props.isSelect
        ? '#3b88c5'
        : props.isSameAsSelected
          ? '#b5d8be'
          : props.isAssociated
            ? '#7fb1d4'
            : '#a4c8e1',
    borderTop: props.row % 3 === 0 ? `${props.row === 0 ? 3 : 1}px solid #369` : '',
    borderBottom: props.row % 3 === 2 ? `${props.row === 8 ? 3 : 1}px solid #369` : '',
    borderLeft: props.col % 3 === 0 ? `${props.col === 0 ? 3 : 1}px solid #369` : '',
    borderRight: props.col % 3 === 2 ? `${props.col === 8 ? 3 : 1}px solid #369` : '',
    fontSize: props.isSelect ? '1.2em' : '1em',
    color: props.isInit ? '#111' : props.isError ? 'red' : '#386351',
}))
</script>

<template>
    <div class="cell" :style="style">
        <div class="exact" v-show="isExact">
            {{ props.selectedValue }}
        </div>
        <div class="alternative" v-show="!isExact && props.selectedValue !== 0">
            <div class="item" v-for="item in 9" :key="item">
                <div v-show="props.selectedValue.includes && props.selectedValue.includes(item)">
                    {{ item }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.cell {
    width: 100%;
    height: 100%;
    border: 0.1px solid #1b4d7a66;
    transition: all 0.1s linear;
    color: #384351;

    .exact {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        font-size: 2em;
        line-height: 0.5em;
    }

    .alternative {
        width: 100%;
        height: 100%;
        display: grid;
        overflow: hidden;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);

        .item {
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            line-height: 1em;
        }
    }
}

@media (max-width: 540px) {
}
</style>
