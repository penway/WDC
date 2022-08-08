<script setup>
import { ref } from 'vue'
import axios from "axios"
import { Edit } from '@element-plus/icons-vue'
import { allParts, partAPI, multipleSelection } from "@/globe"

const name = ref("")
const weight = ref(0)
const c_x = ref(0)
const c_y = ref(0)
const c_z = ref(0)
const isFolder = ref(false)

const target = ref()
const editPartDialog = ref(false)

function toggleEditPartDialog() {
    // 打开对话框，传递数据
    target.value = multipleSelection.value[0]
    console.log(target)
    name.value = target.value.name
    weight.value = target.value.weight
    c_x.value = target.value.c_x
    c_y.value = target.value.c_y
    c_z.value = target.value.c_z
    isFolder.value = target.value.isFolder

    editPartDialog.value = !editPartDialog.value
}

async function editPart() {

    // 调用接口修改数据
    const response = await axios.patch(partAPI + target.value._id, {
        name: name.value,
        weight: weight.value,
        c_x: parseFloat(c_x.value),
        c_y: parseFloat(c_y.value),
        c_z: parseFloat(c_z.value),
    })

    allParts.value = response.data
    
    editPartDialog.value = false
}
</script>

<template>
    <el-popover title="编辑零件" trigger="click" style="background-color: #eeeeee">
        <template #reference>
            <el-button v-if="multipleSelection.length == 1" @click="toggleEditPartDialog()" :icon="Edit"></el-button>
            <el-button v-else disabled @click="toggleEditPartDialog()" :icon="Edit"></el-button>
        </template>

        <el-form class="form" align="center">
            <el-input v-model="name" type="text" placeholder="enter name" />
            <el-input-number v-model="weight" :precision="3" v-if="!isFolder"/>
            <el-input-number v-model="c_x" :precision="0" v-if="!isFolder"/>
            <el-input-number v-model="c_y" v-if="!isFolder"/>
            <el-input-number v-model="c_z" v-if="!isFolder"/> 

            <el-button type="primary" @click="editPart" style="margin-top: 1em; align: center">编辑零件</el-button>
        </el-form>
    </el-popover>
</template>

<style scoped>
.is-disabled {
    color: #c1c1c1 !important;
    background-color: #f1f1f1 !important;
}
button {
    height: 2.5em;
    border-radius: 10px;
    transition: all 0.2s ease-in-out;
    border: 0;
    background-color: #e6e6e6;
}
button:hover, button:active, button:focus {
    background-color: #0a8167;
    color: #0a8167;;
}
</style>