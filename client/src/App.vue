<template>
    <div class="main">
        <el-container>
            <header class="AppHeader">
                <h1>Weight Distributed Calculator</h1>
                <navigator />
            </header>
        </el-container>
        <el-container>

            <el-aside width="20%">
                <main-info :parts="parts" />
                <new-component-button />
                
            </el-aside>

            <el-main>
                <stage-list />
            </el-main>

        </el-container>
    </div>
</template>


<script setup>
import axios from "axios"
import { onMounted } from "vue"

import { parts, partAPI, components, componentAPI } from "./globe"

// components
import MainInfo from "./components/MainInfo.vue"
import NewComponentButton from "./components/ButtonNewComponent.vue"
import PartList from "./components/PartList.vue"
import Navigator from "./components/Navigator.vue"
import StageList from "./components/StageList.vue"


onMounted(async () => {
    var response = await axios.get(componentAPI);
    components.value = response.data
    response = await axios.get(partAPI);
    parts.value = response.data
})
</script>

<style>
@import "./style.css"
</style>