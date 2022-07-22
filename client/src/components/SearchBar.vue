<script setup>
import { globalSearch, parts } from "../globe"

const querySearch = (queryString, cb) => {
    cb(
        parts.value
        .filter(
            part => part.name.toLowerCase().includes(queryString.toLowerCase())
        )
        .map(
            part => {return {value: part.name}}
        )
    )
}
</script>

<template>
    <el-autocomplete 
        v-model="globalSearch"
        :fetch-suggestions="querySearch"
        placeholder="Global Search"
    />
</template>