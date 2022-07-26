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
        popper-append-to-body=“false”
    />
</template>

<!-- <style>
.el-input__wrapper {
    width: 10vw;
    height: 2em;

    /* position: fixed;
    top: 0.9em;
    right: 15em; */

    border-radius: 10px !important;
    border: 0 !important;
    outline: none !important;
    background-color: #ffffff !important; 

    caret-color: #07264a;

    transition: background-color 0.9s ease-in-out;
}
.el-input__wrapper:hover {
    /* width: 20vw; */
    background-color: #dfeeff !important;
}
</style> -->