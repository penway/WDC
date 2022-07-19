<script setup>
import axios from "axios"
import { ref } from 'vue'

import { parts, partAPI, traceID } from "../globe"

// const emit = defineEmits(['add-part'])

const name = ref("")
const weight = ref(0)
const c_x = ref(0)
const c_y = ref(0)
const c_z = ref(0)
const isFolder = ref(false)

const newPartDialog = ref(false)

async function addPartButtonPressed(close) {

    const response = await axios.post(partAPI, {
        name: name.value,
        weight: weight.value,
        c_x: c_x.value,
        c_y: c_y.value,
        c_z: c_z.value,
        parentID: traceID.value[traceID.value.length - 1],
        isFolder: isFolder.value,
    });
    parts.value = response.data

    // reset input values
    name.value = "";
    weight.value = c_x.value = c_y.value = c_z.value = 0;

    // close dialog
    if (close) {
        newPartDialog.value = false;
    }
}
</script>

<template>
    <el-container>
        
        <el-button type="primary" @click="newPartDialog = !newPartDialog">New Part</el-button>

        <el-dialog v-model="newPartDialog" title="Define New Part">
            <el-form class="form">
                <p>Name:</p>
                <el-input v-model="name" type="text" placeholder="enter name" />
                <el-switch v-model="isFolder"/> is folder

                <div v-if="!isFolder">
                    <el-input-number v-model="weight" :precision="2" /> weight<br />
                    <el-input-number v-model="c_x" /> x<br />
                    <el-input-number v-model="c_y" /> y<br />
                    <el-input-number v-model="c_z" /> z<br />
                </div>

                <el-button type="primary"
                    @click="addPartButtonPressed(true)"
                    style="float: right">
                Done
                </el-button>
                <el-button @click="addPartButtonPressed(false)" style="float: right">Add Part</el-button>
            </el-form>
        </el-dialog>

    </el-container>
</template>