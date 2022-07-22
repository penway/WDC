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
<el-popconfirm title="确定删除?" @confirm="removePart(props._id)">
    <template #reference>
        <el-button type="danger">删除</el-button>
    </template>
</el-popconfirm>
</template>