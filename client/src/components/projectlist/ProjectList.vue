<script setup>
import axios from "axios"
import { ref, onMounted } from "vue"

import { projects, projectAPI, currentProjectID, traceID } from "@/globe"
import NewProjectButton from "./NewProjectButton.vue";
import EditProjectButton from "./EditProjectButton.vue";

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
            <header class="card-header" @click="intoProject(project._id)">{{ project.name }}</header>
            <EditProjectButton
                :_id=project._id
                :name=project.name 
                :year=project.year
                :viewToken=project.viewToken
            ></EditProjectButton>
            <!-- <button @click="intoProject(project._id)">进入</button> -->
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
    caret-color: transparent;
}
.page-footer {
    height: 5vh;
    background-color: burlywood;
}
.card-container {
    background-color: #ffffff;
    overflow: auto;
    white-space: nowrap;
    caret-color: transparent;
}
.project-card {
    background-image: url('~@/assets/f1.jpg');
    width: 300px;
    height: 80vh;
    display: inline-block;
    color: white;
    text-align: center;
    /* outline: 2px black solid; */
    margin: 3vh 0vh 3vh 3vh !important;
    border-radius: 20px;
    text-decoration: none;
    margin-right: 20px;
    position: relative;
    transition: all 0.2s ease-in-out;
}
.project-card:hover {
    background-color: rgba(255,255,255,0.06);
    background-blend-mode: lighten;
    cursor: pointer;
    box-shadow: 0 0 10px 2px #181818;
}
.card-header {
    margin: 15px;
    border-radius: 10px;
    background-color: #1156aaac;
    font-size: 20px;
    padding: 20px 0 20px 0;
    transition: all 0.2s ease-in-out;
}
.card-header:hover {
    background-color: #1156aaca;
}
.card-footer {
    position: absolute;
    font-size: 18px;
    height: 170px;
    bottom: 0px;
    width: 300px;
    border-radius: 20px;
    background-image: linear-gradient(
        rgba(0, 0, 0, 0.027),
        rgba(0, 0, 0, 0.785),
        rgba(0, 0, 0, 1));
    transition: all 0.4s ease-in-out;
}
</style>