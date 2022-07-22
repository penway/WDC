<script setup>
import axios from "axios"
import { ref } from 'vue'

import { parts, partAPI, traceID, traceName } from "../../globe"

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

const back = () => { 
    traceID.value.pop()
    traceName.value.pop()
}
</script>

<template>
    <el-container>
        
        <el-button-group>
            <el-button v-if="traceID.length > 1" @click="back" plain>back</el-button>
            <el-button type="primary" class="confirm" @click="newPartDialog = !newPartDialog">New Part</el-button>
        </el-button-group>

        <el-drawer v-model="newPartDialog" title="Define New Part">
            <el-form class="form">
                <el-form-item label="Name" :label-width="80">
                    <el-input v-model="name" type="text" placeholder="enter name" />
                </el-form-item>

                <el-form-item label="is Folder" :label-width="80">
                    <el-switch v-model="isFolder" />
                </el-form-item>


                <div v-if="!isFolder">
                    <el-form-item label="weight" :label-width="80">
                        <el-input-number v-model="weight" :precision="3" />
                    </el-form-item>
                    <el-form-item label="x" :label-width="80">
                        <el-input-number v-model="c_x" :precision="3" />
                    </el-form-item>
                    <el-form-item label="y" :label-width="80">
                        <el-input-number v-model="c_y" :precision="3" />
                    </el-form-item>
                    <el-form-item label="z" :label-width="80">
                        <el-input-number v-model="c_z" :precision="3" />
                    </el-form-item>
                </div>

                <el-button-group>
                    <el-button @click="addPartButtonPressed(false)">Add Part</el-button>
                    <el-button type="primary" @click="addPartButtonPressed(true)">
                        Done
                    </el-button>
                </el-button-group>
            </el-form>
        </el-drawer>

    </el-container>
</template>


<style scoped>
.confirm {
    margin-bottom: 20px;
    background-color: rgb(19, 85, 177);
    border: 0;
}
.confirm:hover {
    background-color: rgb(46, 133, 255);
}
.confirm:active {
    background-color: rgb(0, 106, 255);
}
</style>