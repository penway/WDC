<template>
    <div class="main">
        <el-container class="main-container">

            <aside>
                <div class="headeri">
                    <img src="@/assets/srticon.png" 
                        alt="" class="logo" @click="traceID=[]"/>
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
import { allParts, partAPI, traceID } from "@/globe"

// components
import MainInfo from "@/components/MainInfo.vue"
import Navigator from "@/components/Navigator.vue"
import StageList from "@/components/StageList.vue"
import BimFace from "@/components/bim/BimFace.vue"

onMounted(async () => {
    var response = await axios.get(partAPI);
    allParts.value = response.data
})
</script>

<style>
body {
    font-family: 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    /* caret-color: transparent; */
    margin: 0;
    min-width: 800px;
}
.headeri {
    margin-bottom: 30px;
}
.logo {
    margin-top: 1.2em;
    width: 100px;
    display: inline;
}
.logo:hover {
    cursor: pointer;
}
h1 {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 2em;
    color: #1157aa;

    margin-left: 10px;
    margin-bottom: 20vh;

    display: inline;
}

.main-container {
    height: 100vh;
}

aside {
    font-size: 1.2em;
    padding-left: 1.2em;
    padding-right: 1.2em;
    background-color: rgb(240, 240, 240);
    border-right: #8a8a8a solid 1px;
    width: 38.2vw;
    caret-color: transparent;
}

/* Main Part */
main {
    background-color: #fefefe;
    padding: 0;
    width: 61.8vw;
}
</style>