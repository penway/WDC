<script setup>
import axios from "axios"
import { ref, onMounted } from "vue"

import { projects, projectAPI, currentProjectID, traceID } from "@/globe"
import NewProjectButton from "./NewProjectButton.vue";

onMounted(async () => {
    var response = await axios.get(projectAPI)
    projects.value = response.data
    projects.value.sort((a, b) => a.year - b.year)
})

const intoProject = (id) => {
    currentProjectID.value = id
    traceID.value = [id]
}
</script>

<template>

    <header class="page-header">WDC <NewProjectButton/></header>
    <div class="card-container">

        <div 
            v-for="project of projects" 
            
            class="project-card">
            <header class="card-header">{{ project.name }}</header>
            <button class="Edit">编辑</button>
            <button @click="intoProject(project._id)">进入</button>
            <footer class="card-footer">
                <br/><br/><br/><br/>
                {{ project.weight }}kg
                ({{ project.c_x.toFixed(0) }}, {{ project.c_y.toFixed(0) }}, {{ project.c_z.toFixed(0) }})
                <br/><br/>
                {{ project.year }}</footer>
        </div>
    </div>
    <!-- <footer class="page-footer"></footer> -->
</template>

<style scoped>

.page-header {
    padding-top: 2vh;
    padding-left: 7vh;
    font-size: 40px;
    height: 8vh;
    background-color: #1157aa;
    color: white;
}
.page-footer {
    height: 5vh;
    background-color: burlywood;
}
.card-container {
    background-color: #333;
    overflow: auto;
    white-space: nowrap;
}
.project-card {
    background-image: url('~@/assets/f1.jpg');
    width: 300px;
    height: 85vh;
    display: inline-block;
    color: white;
    text-align: center;
    /* outline: 2px black solid; */
    text-decoration: none;
    margin-right: 20px;
    position: relative;
    
}
.project-card:hover {
    background-color: rgba(255,255,255,0.06);
    background-blend-mode: lighten;
}
.card-header {
    margin: 15px;
    border-radius: 20px;
    background-color: #1156aaac;
    font-size: 20px;
    padding: 20px 0 20px 0;
}
.card-footer {
    position: absolute;
    font-size: 18px;
    height: 170px;
    bottom: 0px;
    width: 300px;
    background-image: linear-gradient(
        rgba(0, 0, 0, 0.027),
        rgba(0, 0, 0, 0.785),
        rgba(0, 0, 0, 1));
}
</style>