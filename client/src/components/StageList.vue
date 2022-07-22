<script setup>
import PartList from "./partlist/PartList.vue"
import PartPage from "./PartPage.vue"
import { isPart } from "../globe"

</script>

<template>
    <div>
        <part-list v-if="!isPart"/>
        <part-page v-else />
    </div>
</template>