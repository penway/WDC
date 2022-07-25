<script setup>
import { traceName, traceID, isPart } from "../globe"
import SearchBar from "./SearchBar.vue";

const navi = (index) => {
    if (index + 1 < traceName.value.length) isPart.value = false
    traceID.value.length = traceName.value.length = index + 1
}
</script>

<template>
    <div class="navigator">
        <span v-for="(name, index) in traceName" class="bread">
            <span class="buoy" @click="navi(index)">{{ name }}</span>
            <span v-if="index < traceName.length - 1"> > </span>
        </span>
        <span class="search-bar"><SearchBar /></span>
    </div>
</template>

<style scoped>
.navigator {
    color: #ffffff;
    padding: 1.2em 1em 1em 1em;
    background-color: #1157aa;
    user-select: none;
}

.buoy:hover{
    color: #99bbd8;
    cursor: pointer;
}

.buoy:active {
    color: #5f8fb9bc;
}

.bread {
    width: 100vh;
}

.search-bar {
    position: absolute;
    top: 0.8em;
    right: 1.2em;
}
</style>