<script setup>
import axios from "axios"
import { ref } from 'vue'

import { parts, partAPI } from "../globe"

const emit = defineEmits(['add-part'])

const name = ref("")
const weight = ref(0)
const c_x = ref(0)
const c_y = ref(0)
const c_z = ref(0)
const symmetry = ref(false)

const newPartDialog = ref(false)

async function addPart(name, weight, c_x, c_y, c_z, symmetry) {

    var response;
    if (symmetry.value) {
        await axios.post(partAPI, {
            name: name,
            weight: weight,
            c_x: c_x,
            c_y: c_y,
            c_z: c_z,
        });
        response = await axios.post(partAPI, {
            name: name + "-sym",
            weight: weight,
            c_x: c_x,
            c_y: -c_y,
            c_z: c_z,
        });
    } else {
        response = await axios.post(partAPI, {
            name: name,
            weight: weight,
            c_x: c_x,
            c_y: c_y,
            c_z: c_z,
        });
    }

    parts.value.push(response.data)
}

function addPartButtonPressed(close) {
    addPart(name.value, weight.value, c_x.value, c_y.value, c_z.value, symmetry.value) 

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
    <el-button @click="newPartDialog = !newPartDialog">New Part</el-button>
    <el-dialog v-model="newPartDialog" title="Define New Part">
    <el-form class="form">
        <p>Name:</p>
        <el-input v-model="name" type="text" placeholder="enter name" />

        <el-input-number v-model="weight" :precision="2" /> weight<br />
        <el-input-number v-model="c_x" /> x<br />
        <el-input-number v-model="c_y" /> y<br />
        <el-input-number v-model="c_z" /> z<br />
        <el-switch v-model="symmetry"/>symmetry

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