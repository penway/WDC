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