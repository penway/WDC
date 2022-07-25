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
        <h4></h4>
        <div class="cog">
            <h1>总质量</h1>
            <p>{{ weight_sum }} kg</p>
        </div>
        <div class="cog">
            <h1>重心</h1>
            <p>{{ cox }}</p>
            <p>{{ coy }}</p>
            <p>{{ coz }}</p>
        </div>
    </div>
</template>


<style scoped>
.main-info {
    position: absolute;
    bottom: 0vw;
    width: calc(19vw);
}
.cog {
    border-radius: 10px;
    color: white;
    background-color: #1c79e8;
    margin-bottom: 1em;

    text-align: center;
    padding: 1em;
}
.cog:hover {
    box-shadow: 0px 0px 6px 1px #888888;
}
h1 {
    color: white;
    font-size: 1.2em;
    margin: 0;
    padding-bottom: 1em;
}
p { 
    margin: 0;
    padding: 0.2em;
}
</style>