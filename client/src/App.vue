<template>
    <div class="main">
        <el-container>
            
            <el-aside width="20%">
                <h1>Parts List</h1>
                <main-info :parts="parts"/>
                <new-part-button/>
            </el-aside>

            <el-main>
                <part-list :parts="parts"></part-list>
            </el-main>
        </el-container>
    </div>
</template>


<script setup>
import axios from "axios"
import { onMounted } from "vue"

import { parts } from "./globe"

// components
import MainInfo from "./components/MainInfo.vue"
import NewPartButton from "./components/NewPartButton.vue"
import PartList from "./components/PartList.vue"
const partAPI = "/api/partList/"

onMounted(async () => {
    const response = await axios.get(partAPI);
    parts.value = response.data
})
</script>
