<script setup>
import { ref } from 'vue'
import axios from "axios"

import { parts, partAPI } from "../../globe"

const props = defineProps([
    "name",
    "weight",
    "c_x",
    "c_y",
    "c_z",
    "_id",
    "isFolder"
])
const emit = defineEmits(["edit-part"])

const name = ref("")
const weight = ref(0)
const c_x = ref(0)
const c_y = ref(0)
const c_z = ref(0)
const isFolder = props.isFolder

const editPartDialog = ref(false)

function toggleEditPartDialog() {
    
    editPartDialog.value = !editPartDialog.value
    name.value = props.name
    weight.value = props.weight
    c_x.value = props.c_x
    c_y.value = props.c_y
    c_z.value = props.c_z
}

async function editPart() {

    const response = await axios.patch(partAPI + props._id, {
        name: name.value,
        weight: weight.value,
        c_x: c_x.value,
        c_y: c_y.value,
        c_z: c_z.value,
    })

    parts.value = response.data
    
    editPartDialog.value = false
}
</script>

<template>
    <el-popover title="编辑零件" trigger="click" style="background-color: #eeeeee">
        <template #reference>
            <el-button type="info" @click="toggleEditPartDialog()">编辑</el-button>
        </template>

        <el-form class="form" align="center">
            <el-input v-model="name" type="text" placeholder="enter name" />
            <el-input-number v-model="weight" :precision="3" v-if="!isFolder"/>
            <el-input-number v-model="c_x" v-if="!isFolder"/>
            <el-input-number v-model="c_y" v-if="!isFolder"/>
            <el-input-number v-model="c_z" v-if="!isFolder"/> 

            <el-button type="primary" @click="editPart" style="margin-top: 1em; align: center">编辑零件</el-button>
        </el-form>
    </el-popover>
</template>