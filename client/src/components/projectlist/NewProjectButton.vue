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

    name.value = ""
    year.value = 2020
    newProjectDialog.value = false
}

</script>

<template>
    <button class="new" @click="newProjectDialog=true">新项目</button>

    <el-drawer v-model="newProjectDialog" title="新项目">
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
    </el-drawer>
</template>

<style scoped>
button.new {
    position: fixed;
    right: 2vh;
    top: 2vh;
    height: 6vh;
    width: 12vh;
    background-color: #002760;
    color: white;
    border-radius: 10px;
    border: none;
}
</style>