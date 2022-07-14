<script setup>
const props = defineProps(["_id", "index"])
const emit = defineEmits(["del-part"])
</script>

<template>
<el-popconfirm title="Are you sure to delete this?" @confirm="$emit('del-part', props._id, props.index)">
    <template #reference>
        <el-button style="float: right">Del</el-button>
    </template>
</el-popconfirm>
</template>