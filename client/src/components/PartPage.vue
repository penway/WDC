<script setup>
import { traceName, traceID, isPart, currentPart } from "../globe"

const back = () => { 
    traceID.value.pop()
    isPart.value = false
}

</script>

<template>
    <h2>{{ currentPart.name }}</h2>
    <p>{{ currentPart }}</p>

    <el-button-group>
        <el-button v-if="traceID.length > 1" @click="back" plain>back</el-button>
    </el-button-group>

    <p>This is a Part.</p>

</template>