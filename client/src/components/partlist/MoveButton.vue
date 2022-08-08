<script setup>
import { ref } from 'vue'
import axios from "axios"
import { parts, partAPI, allParts, currentProjectID, traceName, multipleSelection } from "@/globe"
import { Right } from '@element-plus/icons-vue'

const globalSearch = ref("")

const ancestor = (item) => {
    var currentParent = item._id
    var idList = []
    var nameList = []

    while (true) {
        var currentPart = parts.value.find(part => part._id == currentParent)
        if (currentPart == undefined) break
        idList.push(currentPart._id)
        nameList.push(currentPart.name)
        currentParent = currentPart.parentID
    }

    return !idList.includes(multipleSelection.value[0]._id)
}

const querySearch = (queryString, cb) => {
    var res = parts.value
        .filter( part => 
            part.name.toLowerCase().includes(queryString.toLowerCase())
            && part.isFolder
            && ancestor(part)
        )
        .map( part => { return {
            value: part.name, 
            _id: part._id
        }})

    res.push({
        value: traceName.value[0],
        _id: currentProjectID,
    })

    cb(res)
}

const movePart = async (item) => {
    // 发送一个空请求更新自己的质量
    let parentID = multipleSelection.value[0].parentID

    multipleSelection.value.forEach(async (part) => {
        const response = await axios.patch(partAPI + part._id, {
            parentID: item._id
        })
        // allParts.value = response.data
    })

    var response = await axios.post(partAPI, {
        name: "placeholder",
        weight: 0,
        c_x: 0,
        c_y: 0,
        c_z: 0,
        parentID: parentID,
        projectID: currentProjectID.value,
        isFolder: false,
    });
    allParts.value = response.data

    let x = response.data.find(part => part.name == "placeholder")
    var response = await axios.delete(partAPI + x._id)
    allParts.value = response.data

    globalSearch.value = ""
}
</script>

<template>
    <el-popover title="移动零件" trigger="click" style="background-color: #eeeeee">
        <template #reference>
            <el-button v-if="multipleSelection.length > 0" :icon="Right"></el-button>
            <el-button v-else disabled :icon="Right"></el-button>
        </template>

    <el-autocomplete 
        v-model="globalSearch"
        :fetch-suggestions="querySearch"
        placeholder="搜索"
        @select="movePart"
    />
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
    background-color: #0a4681;
    color: #0a4681;
}
</style>