<template>
    <div v-if="traceID.length == 0"><ProjectList/></div>
    <div v-else><Workbench/></div>
</template>


<script setup>
import { traceID } from "@/globe"
import ProjectList from "./components/projectlist/ProjectList.vue"
import Workbench from "./components/Workbench.vue";
</script>

<style>

</style>