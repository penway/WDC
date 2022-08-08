<script setup>
import axios from "axios"
import { 
    parts, partAPI, allParts, multipleSelection
    } from "@/globe"
import { Delete } from '@element-plus/icons-vue'
const props = defineProps(["_id"])
const emit = defineEmits(["del-part"])

async function removePart() {

    multipleSelection.value.forEach(async (part, index) => {
        const succeed = await axios.delete(partAPI + part._id)

        if (succeed) {
            allParts.value = succeed.data
        } else {
            alert("Deletion Failed!" + part + index)
        }
    })
}
</script>

<template>
<el-popconfirm title="确定删除?" @confirm="removePart(props._id)">
    <template #reference>
        <el-button v-if="multipleSelection.length > 0" :icon="Delete"></el-button>
        <el-button v-else disabled :icon="Delete"></el-button>
    </template>
</el-popconfirm>
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
    background-color: #8e0d0d;
    color: #8e0d0d;
}
</style>