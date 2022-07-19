<template>
    <div class="main">
        <el-container class="main-container" >

            <el-aside>
                <h1>Weight Distributed Calculator</h1>
                <navigator/>
                <main-info :parts="parts" />
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

import { parts, partAPI } from "./globe"

// components
import MainInfo from "./components/MainInfo.vue"
import Navigator from "./components/Navigator.vue"
import StageList from "./components/StageList.vue"


onMounted(async () => {
    var response = await axios.get(partAPI);
    parts.value = response.data
})
</script>

<style>
@import "./style.css"
</style>