<script setup>
import axios from "axios"
import { 
    parts, partAPI
    } from "../../globe"

const props = defineProps(["_id"])
const emit = defineEmits(["del-part"])

async function removePart() {

    const succeed = await axios.delete(partAPI + props._id);

    if (succeed) {
        parts.value = succeed.data
    } else {
        alert("Deletion Failed!")
    }
}
</script>

<template>
<el-popconfirm title="Are you sure to delete this?" @confirm="removePart(props._id)">
    <template #reference>
        <el-button type="danger">Del</el-button>
    </template>
</el-popconfirm>
</template>