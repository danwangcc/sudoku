<script setup lang="ts">
import { defineProps } from 'vue'

const { isShow, title } = defineProps<{
    isShow: boolean
    title: string
}>()
</script>

<template>
    <div class="mask" v-show="isShow">
        <div class="popup">
            <div class="title">
                {{ title }}
            </div>
            <div class="content">
                <slot />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.mask {
    width: 100vw;
    height: 100vh;
    background: #33333311;
    position: fixed;

    .popup {
        width: 300px;
        height: 240px;
        background: #cdbcdddd;
        border: 10px solid #e8daf6dd;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;

        .title {
            font-size: 2em;
        }
    }
}
</style>
