<script setup>
import axios from "axios"

import EditButton from "./EditButton.vue"
import DeleteButton from "./DeleteButton.vue"

import { parts, partAPI } from "../globe"

async function removePart(_id, index) {
    const succeed = await axios.delete(partAPI + _id);
    if (succeed) {
        parts.value.splice(index)
    } else {
        alert("Deletion Failed!")
    }
}

async function editPart(_id, name, weight, c_x, c_y, c_z) {
    const response = await axios.patch(partAPI + _id, {
        name: name,
        weight: weight,
        c_x: c_x,
        c_y: c_y,
        c_z: c_z,
    })
    parts.value = response.data
}
</script>

<template>
<el-scrollbar height="500px">
    <!-- PART CARDS -->
    <el-card v-for="(part, index) in parts" :key="part._id" shadow="hover">
        <template #header>
            <div class="part-title">
                <span class="part-name">{{ part.name }}</span>

                <!-- Edit Button -->
                <edit-button :name="part.name" :weight="part.weight" :c_x="part.c_x" :c_y="part.c_y"
                    :c_z="part.c_z" :_id="part._id" @edit-part="editPart" />

                <!-- Delete Button-->
                <delete-button :_id="part._id" :index="index" @del-part="removePart" />
            </div>
        </template>
        <span class="part-weight">weight: {{ part.weight }}</span><br />
        <span class="part-x">x: {{ part.c_x }}</span><br />
        <span class="part-y">y: {{ part.c_y }}</span><br />
        <span class="part-z">z: {{ part.c_z }}</span>
    </el-card>
</el-scrollbar>
</template>