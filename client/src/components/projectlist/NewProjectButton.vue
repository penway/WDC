<script setup>
import { ref } from 'vue'
import axios from "axios"

import { projects, projectAPI } from '@/globe'

const newProjectDialog = ref(false)
const name = ref("")
const year = ref(2020)

const addProjectButtonPressed = async () => {

    const response = await axios.post(projectAPI, {
        name: name.value,
        year: year.value,
        weight: 0,
        c_x: 0,
        c_y: 0,
        c_z: 0,
        viewToken: "placeholder",
    })
    projects.value = response.data
    projects.value.sort((a, b) => a.year - b.year)

    name.value = ""
    year.value = 2020
    newProjectDialog.value = false
}

</script>

<template>
    <button class="new" @click="newProjectDialog=true">新项目</button>

    <Transition>
        <div v-if="newProjectDialog" class="x-overlay"/>
    </Transition>

    <el-dialog v-model="newProjectDialog" title="新项目">
        <el-form class="form">
            <el-form-item label="名称" :label-width="40">
                <el-input v-model="name" type="text" placeholder="enter name" />
            </el-form-item>
            <el-form-item label="赛季" :label-width="40">
                <el-input v-model="year" type="number" placeholder="enter year" />
            </el-form-item>
            <el-form-item label="" :label-width="40">
            <el-button type="primary" @click="addProjectButtonPressed()">
                Done
            </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<style>
.el-dialog {
    border-radius: 20px;
    top: 5%;
    width: 40%;
    background-color: #d6dce5e0;
    backdrop-filter:blur(12px);
}
.x-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 200%;
    backdrop-filter:blur(6px);
    z-index: 2000;
    transition: all 0.2s ease-in-out;
}
.v-enter-active,
.v-leave-active {
    backdrop-filter:blur(6px);
    transition: all 0.5s ease;
}
.v-enter-from,
.v-leave-to {
    opacity: 0;
}
button.new {
    position: fixed;
    right: 2.5vh;
    top: 2.5vh;
    height: 6vh;
    width: 12vh;
    font-size: 2vh;
    background-color: #002760;
    color: white;
    border-radius: 10px;
    border: none;
    transition: all 0.2s ease-in-out;
}
button.new:hover {
    cursor: pointer;
    color: #0078f7;
    background-color: #0078f7;
}
.el-input {
    caret-color: black;
}
</style>