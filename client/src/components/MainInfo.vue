<script setup>
import { computed } from "vue"
import { parts } from "../globe"


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
    <div class="main-info">
        <h1>总质量</h1>
        <p>{{ weight_sum }} kg</p>
        <br/>
        <h1>重心</h1>
        <p>{{ cox }}</p>
        <p>{{ coy }}</p>
        <p>{{ coz }}</p>
    </div>
</template>


<style scoped>
.main-info {
    width: 36.5vw;
    height: 10vh;

    border-radius: 20px 20px 0px 0px;
    color: white;
    background-color: #0b458c;
    padding: 2vh 0 1vh 0;
    /* margin-bottom: 1em; */

    text-align: center;

    transition: all 0.5s ease-in-out;
}
.main-info:hover {
    background-color: #1c79e8;
    box-shadow: 0px 0px 8px 2px #888888;
}
h1 {
    color: white;
    font-size: 1.2em;
    margin: 0;
    padding-bottom: 1em;
    display: inline;
}
p { 
    margin: 0;
    padding: 0.2em;
    display: inline;
}
</style>