<script setup lang="ts">
import { ref, onMounted } from "vue";
import { BabylonApp } from "../babylon/BabylonApp";

const canvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
    if (canvas.value instanceof HTMLCanvasElement) {
        new BabylonApp(canvas.value);
    }
});
</script>

<template>
    <canvas ref="canvas"></canvas>
</template>
