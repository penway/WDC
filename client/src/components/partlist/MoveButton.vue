<script setup>
import { ref } from 'vue'
import axios from "axios"
import { parts, partAPI } from "../../globe"

const props = defineProps(["_id"])

const globalSearch = ref("")

const ancestor = (item) => {
    var currentParent = item._id
    var idList = []
    var nameList = []

    while (currentParent != "0") {
        var currentPart = parts.value.find(part => part._id == currentParent)
        idList.push(currentPart._id)
        nameList.push(currentPart.name)
        currentParent = currentPart.parentID
    }

    return !idList.includes(props._id)
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
        value: "速翼2020",
        _id: 0,
    })

    cb(res)
}

const movePart = async (item) => {
    const response = await axios.patch(partAPI + props._id, {
        parentID: item._id
    })
    parts.value = response.data

    globalSearch.value = ""
}
</script>

<template>
    <el-popover title="移动零件" trigger="click" style="background-color: #eeeeee">
        <template #reference>
            <el-button>移动</el-button>
        </template>

    <el-autocomplete 
        v-model="globalSearch"
        :fetch-suggestions="querySearch"
        placeholder="搜索"
        @select="movePart"
    />
    </el-popover>
</template>