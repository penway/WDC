<template>
    <div class="main">
        <el-container class="main-container" >

            <el-aside>
                <h1>Weight Distribution Calculator</h1>
                <search-bar/>
                <navigator/>
                <main-info/>
            </el-aside>

            <el-main>
                <stage-list/>
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
import SearchBar from "./components/SearchBar.vue"

onMounted(async () => {
    var response = await axios.get(partAPI);
    parts.value = response.data
})
</script>

<style>
@import "./style.css"
</style>