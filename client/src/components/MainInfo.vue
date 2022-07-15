<script setup>
import { computed } from "vue"
const props = defineProps(['parts'])

// computed variables of total weight and CoG
const weight_sum = computed(() => {
    let sum = 0
    props.parts.forEach(part => sum += part.weight)
    return sum
})

const cox = computed(() => {
    let sum = 0
    props.parts.forEach(part => sum += part.c_x * part.weight)
    return Math.round(sum / weight_sum.value)
})

const coy = computed(() => {
    let sum = 0
    props.parts.forEach(part => sum += part.c_y * part.weight)
    return Math.round(sum / weight_sum.value)
})

const coz = computed(() => {
    let sum = 0
    props.parts.forEach(part => sum += part.c_z * part.weight)
    return Math.round(sum / weight_sum.value)
})
</script>

<template>
<h4>Total Weight: {{ weight_sum }} kg</h4>
<h4>Centor of Gravity: </h4>
<ul>
    <li>{{ cox }}</li>
    <li>{{ coy }}</li>
    <li>{{ coz }}</li>
</ul>
</template>