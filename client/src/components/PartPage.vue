<script setup>
import { traceName, traceID, isPart } from "../globe"

const back = () => { 
    traceID.value.pop()
    traceName.value.pop()
    isPart.value = false
}
</script>

<template>
    <h2>{{ traceName[traceName.length - 1] }}</h2>

    <el-button-group>
        <el-button v-if="traceID.length > 1" @click="back" plain>back</el-button>
    </el-button-group>

    <p>This is a Part.</p>

</template>