<script setup>
import PartList from "./PartList.vue"
import ComponentList from "./ComponentList.vue"
import { traceCID } from "../globe"
</script>

<template>
    <div v-if="traceCID == 0">
        <h2>COMPONENTS</h2>
        <component-list />
    </div>
    <div v-else>
        <part-list />
    </div>
</template>