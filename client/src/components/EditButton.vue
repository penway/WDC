<script setup>
import { ref } from 'vue'

const props = defineProps([
    "name",
    "weight",
    "c_x",
    "c_y",
    "c_z",
    "_id"
])
const emit = defineEmits(["edit-part"])

const name = ref("")
const weight = ref(0)
const c_x = ref(0)
const c_y = ref(0)
const c_z = ref(0)

const editPartDialog = ref(false)

function toggleEditPartDialog() {
    editPartDialog.value = !editPartDialog.value
    name.value = props.name
    weight.value = props.weight
    c_x.value = props.c_x
    c_y.value = props.c_y
    c_z.value = props.c_z
}

function editPart() {
    emit("edit-part", props._id, name.value, weight.value, c_x.value, c_y.value, c_z.value)
    editPartDialog.value = false
}
</script>

<template>
<el-container>
    <el-button @click="toggleEditPartDialog()">Edit</el-button>
    <el-dialog v-model="editPartDialog" title="Edit Part">
        <el-form class="form">
        <p>Name:</p>
        <el-input v-model="name" type="text" placeholder="enter name" />

        <el-input-number v-model="weight" :precision="2" /> weight<br />
        <el-input-number v-model="c_x" /> x<br />
        <el-input-number v-model="c_y" /> y<br />
        <el-input-number v-model="c_z" /> z

        <el-button type="primary" @click="editPart" style="float: right">Edit Part</el-button>
        </el-form>
    </el-dialog>
</el-container>
</template>