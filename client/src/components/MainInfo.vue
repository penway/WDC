<script setup>
import { computed } from "vue"
import { parts } from "../globe"
// const props = defineProps(['parts'])


// computed variables of total weight and CoG
const weight_sum = computed(() => {
    let sum = 0
    parts.value.forEach(part => { if (part.parentID == "0") sum += part.weight })
    return sum
})

const cox = computed(() => {
    let sum = 0
    parts.value.forEach(part => { if (part.parentID == "0") sum += part.c_x * part.weight })
    return Math.round(sum / weight_sum.value)
})

const coy = computed(() => {
    let sum = 0
    parts.value.forEach(part => { if (part.parentID == "0") sum += part.c_y * part.weight })
    return Math.round(sum / weight_sum.value)
})

const coz = computed(() => {
    let sum = 0
    parts.value.forEach(part => { if (part.parentID == "0") sum += part.c_z * part.weight })
    return Math.round(sum / weight_sum.value)
})
</script>

<template>
    <h4>总质量: {{ weight_sum }} kg</h4>
    <h4>重心: </h4>
    <ul>
        <li>{{ cox }}</li>
        <li>{{ coy }}</li>
        <li>{{ coz }}</li>
    </ul>
</template>