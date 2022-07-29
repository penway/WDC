<template>
    <div class="main">
        <el-container class="main-container">

            <aside>
                <div class="headeri">
                    <img src="@/assets/srticon.png" alt="" class="logo"/>
                    <h1>质量分布计算</h1>
                </div>
                <div>
                    
                    <BimFace/>
                    <main-info/>
                </div>
            </aside>

            <main>
                <navigator/>
                <stage-list/>
            </main>

        </el-container>
    </div>
</template>


<script setup>
import axios from "axios"
import { onMounted } from "vue"

import { parts, partAPI } from "@/globe"

// components
import MainInfo from "@/components/MainInfo.vue"
import Navigator from "@/components/Navigator.vue"
import StageList from "@/components/StageList.vue"
import BimFace from "@/components/bim/BimFace.vue"

onMounted(async () => {
    var response = await axios.get(partAPI);
    parts.value = response.data
})
</script>

<style>
@import "@/style.css"
</style>