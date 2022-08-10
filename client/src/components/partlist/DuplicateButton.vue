<script setup>
import axios from "axios"
import { 
    parts, partAPI, allParts, multipleSelection
    } from "@/globe"
import { CopyDocument } from '@element-plus/icons-vue'
import { ref } from "vue";

const mirror = ref(true)
const suffix = ref("")

async function dupPart() {

    multipleSelection.value.forEach(async (part, index) => {
        var oldList = structuredClone(allParts.value)

        var partName = part.name + (mirror.value
                ? part.c_y > 0 ? "-R" : "-L"
                : suffix.value)

        const response = await axios.post(partAPI, {
            name: partName,
            weight: part.weight,
            c_x: part.c_x,
            c_y: mirror.value ? -part.c_y : part.c_y,
            c_z: part.c_z,
            parentID: part.parentID,
            projectID: part.projectID,
            isFolder: part.isFolder,
        });

        var newChildren = parts.value.filter(item => item.parentID == part._id)
        allParts.value = response.data

        var newList = structuredClone(allParts.value)
        var newParent = newList.find(x => oldList.find(y => y._id == x._id) == undefined)
        dupChilren(newChildren, newParent._id)
    })
}

async function dupChilren(children, parentID) {
    if (children.length == 0) return
    
    children.forEach(async (part, index) => {
        var oldList = structuredClone(allParts.value)

        var partName = part.name + (mirror.value
                ? part.c_y > 0 ? "-R" : "-L"
                : suffix.value)

        const response = await axios.post(partAPI, {
            name: partName,
            weight: part.weight,
            c_x: part.c_x,
            c_y: mirror.value ? -part.c_y : part.c_y,
            c_z: part.c_z,
            parentID: parentID,
            projectID: part.projectID,
            isFolder: part.isFolder,
        });
        var newChildren = parts.value.filter(item => item.parentID == part._id)
        allParts.value = response.data

        var newList = structuredClone(allParts.value)
        var newParent = newList.find(x => oldList.find(y => y._id == x._id) == undefined)
        dupChilren(newChildren, newParent._id)
    })
}
</script>

<template>
<el-popover title="复制" trigger="click" @confirm="dupPart()">
    <template #reference>
        <el-button v-if="multipleSelection.length > 0" :icon="CopyDocument"></el-button>
        <el-button v-else disabled :icon="Delete"></el-button>
    </template>
    <el-form class="form" align="center">
        <el-input v-if="!mirror" v-model="suffix" placeholder="请输入后缀"/>
        <br v-if="!mirror"/><br v-if="!mirror"/>
        <el-switch v-model="mirror" /> 镜像
        <br/><br/>
        
        <el-button v-if="mirror" @click="dupPart">镜像</el-button>
        <el-button v-else @click="dupPart">复制</el-button>
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
    background-color: #E0610E;
    color: #E0610E;
}
</style>