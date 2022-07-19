<script setup>
import PartList from "./partlist/PartList.vue"
import PartPage from "./PartPage.vue"
import { isPart } from "../globe"
import MainInfo from "./MainInfo.vue"
</script>

<template>
    <div>
        <main-info :parts="parts" />
        <part-list v-if="!isPart"/>
        <part-page v-else />
    </div>
</template>