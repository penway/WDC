<script setup>
import axios from "axios"
import { ref } from 'vue'

import { components, componentAPI } from "../globe"

const emit = defineEmits(['add-component'])

const name = ref("")
const weight = ref(0)
const c_x = ref(0)
const c_y = ref(0)
const c_z = ref(0)
const symmetry = ref(false)

const newComponentDialog = ref(false)

async function addComponent() {

    var response;
    if (symmetry.value) {

        response = await axios.post(componentAPI, {
            name: name.value,
            weight: weight.value,
            c_x: c_x.value,
            c_y: c_y.value,
            c_z: c_z.value,
        });
        components.value.push(response.data)

        response = await axios.post(componentAPI, {
            name: name.value + "-sym",
            weight: weight.value,
            c_x: c_x.value,
            c_y: -c_y.value,
            c_z: c_z.value,
        });
        components.value.push(response.data)
    }
    else {
        response = await axios.post(componentAPI, {
            name: name.value,
            weight: weight.value,
            c_x: c_x.value,
            c_y: c_y.value,
            c_z: c_z.value,
        });
        components.value.push(response.data)
    }
}

function addComponentButtonPressed(close) {
    addComponent() 

    // reset input values
    name.value = "";
    weight.value = c_x.value = c_y.value = c_z.value = 0;

    // close dialog
    if (close) {
        newComponentDialog.value = false;
    }
}
</script>

<template>
    <el-container>
        <el-button type="primary" @click="newComponentDialog = !newComponentDialog">New Component</el-button>

        <el-dialog v-model="newComponentDialog" title="Define New Component">
            <el-form class="form">
                <p>Name:</p>
                <el-input v-model="name" type="text" placeholder="enter name" />

                <el-input-number v-model="weight" :precision="2" /> weight<br />
                <el-input-number v-model="c_x" /> x<br />
                <el-input-number v-model="c_y" /> y<br />
                <el-input-number v-model="c_z" /> z<br />
                <el-switch v-model="symmetry" />symmetry

                <el-button-group style="float: right">
                    <el-button @click="addComponentButtonPressed(false)">
                        Add Component
                    </el-button>
                    <el-button type="primary" @click="addComponentButtonPressed(true)">
                        Done
                    </el-button>
                </el-button-group>
            </el-form>
        </el-dialog>
    </el-container>
</template>