<script setup>
import { parts, currentParts, traceName, traceID, isPart } from "../globe"
import EditButton from "./EditButton.vue"
import DeleteButton from "./DeleteButton.vue"
import NewPartButton from "./ButtonNewPart.vue"

const back = () => { 
    traceID.value.pop()
    traceName.value.pop()
    isPart.value = false
}

const forward = (id, name, isFolder) => {
    traceID.value.push(id)
    traceName.value.push(name)
    isPart.value = !isFolder
}
</script>

<template>
    <h2>{{ traceName[traceName.length - 1] }}</h2>

    <el-button-group>
        <el-button v-if="traceID.length > 1" @click="back" plain>back</el-button>
    </el-button-group>

    <p>This is a Part.</p>

</template>