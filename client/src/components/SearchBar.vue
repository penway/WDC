<script setup>
import { ref } from 'vue'
import { parts, traceID, traceName, localSearch } from "../globe"

const globalSearch = ref("")

const querySearch = (queryString, cb) => {
    cb(
        parts.value
        .filter(
            part => part.name.toLowerCase().includes(queryString.toLowerCase())
        )
        .map(
            part => {return {value: part.name, _id: part._id}}
        )
    )
}

const handleSelect = (item) => {
    var currentParent = item._id
    var idList = []
    var nameList = []

    while (currentParent != "0") {
        var currentPart = parts.value.find(part => part._id == currentParent)
        idList.push(currentPart._id)
        nameList.push(currentPart.name)
        currentParent = currentPart.parentID
    }

    nameList.push("速翼2020")
    nameList.reverse().pop()
    idList.push(0)
    idList.reverse().pop()

    console.log(nameList)
    console.log(idList)

    traceID.value = idList
    traceName.value = nameList

    globalSearch.value = ""
    localSearch.value = item.value
}
</script>

<template>
    <el-autocomplete 
        v-model="globalSearch"
        :fetch-suggestions="querySearch"
        placeholder="全局搜索"
        @select="handleSelect"
    />
</template>