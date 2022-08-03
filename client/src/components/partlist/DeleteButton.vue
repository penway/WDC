<script setup>
import axios from "axios"
import { 
    parts, partAPI, allParts
    } from "../../globe"
import { Delete } from '@element-plus/icons-vue'
const props = defineProps(["_id"])
const emit = defineEmits(["del-part"])

async function removePart() {

    const succeed = await axios.delete(partAPI + props._id);

    if (succeed) {
        allParts.value = succeed.data
    } else {
        alert("Deletion Failed!")
    }
}
</script>

<template>
<el-popconfirm title="确定删除?" @confirm="removePart(props._id)">
    <template #reference>
        <el-button :icon="Delete"></el-button>
    </template>
</el-popconfirm>
</template>