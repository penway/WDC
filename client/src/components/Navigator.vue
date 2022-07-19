<script setup>
import { traceName, traceID, isPart } from "../globe"

const navi = (index) => {
    if (index + 1 < traceName.value.length) isPart.value = false
    traceID.value.length = traceName.value.length = index + 1
}
</script>

<template>
    <div class="navigator">
        <span v-for="(name, index) in traceName">
            <span class="buoy" @click="navi(index)">{{ name }}</span>
            <span> / </span>
        </span>
    </div>
</template>