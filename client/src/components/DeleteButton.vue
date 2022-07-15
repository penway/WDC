<script setup>
import axios from "axios"
import { 
    parts, partAPI, 
    componentAPI, traceCID
    } from "../globe"

const props = defineProps(["_id", "index"])
const emit = defineEmits(["del-part"])

async function removePart() {

    const API = (traceCID.value == 0) ? componentAPI : partAPI

    const succeed = await axios.delete(API + props._id);

    if (succeed) {
        parts.value.splice(props.index, 1)
        currentParts.value.splice(props.index, 1)
    } else {
        alert("Deletion Failed!")
    }
}
</script>

<template>
<el-popconfirm title="Are you sure to delete this?" @confirm="removePart()">
    <template #reference>
        <el-button type="danger">Del</el-button>
    </template>
</el-popconfirm>
</template>