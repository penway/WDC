<template>
    <div class="main">
        <el-container class="main-container" >

            <el-aside>
                <h1>Weight Distribution Calculator</h1>
                <navigator/>
                
                <router-link to="/">Main</router-link><br/>
                <router-link to="/interchangeable">interchangeable</router-link>
            </el-aside>

            <el-main>
                <router-view/>
            </el-main>

        </el-container>
    </div>
</template>


<script setup>
import axios from "axios"
import { onMounted } from "vue"


import { parts, partAPI } from "./globe"

// components

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