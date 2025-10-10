<script setup lang="ts">
import { defineProps, computed } from 'vue'

const props = defineProps<{
    row: number
    col: number
    isSelect: boolean
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
    borderTop: props.row % 3 === 0 ? '1px solid #666' : '',
    borderBottom: props.row % 3 === 2 ? '1px solid #666' : '',
    borderLeft: props.col % 3 === 0 ? '1px solid #666' : '',
    borderRight: props.col % 3 === 2 ? '1px solid #666' : '',
    fontSize: props.isSelect ? '1.2em' : '1em',
    color: props.isError ? 'red' : '#384351',
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
    }

    .alternative {
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
        }
    }
}
</style>
