<script setup>
import axios from "axios"
import { ref } from 'vue'
import { ArrowLeftBold, Plus } from '@element-plus/icons-vue'
import { allParts, partAPI, traceID, localSearch, currentProjectID, multipleSelection } from "@/globe"

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
        projectID: currentProjectID.value,
        isFolder: isFolder.value,
    });
    allParts.value = response.data

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
    <el-button v-if="multipleSelection.length > 0" class="confirm" @click="newPartDialog = !newPartDialog" :icon="Plus"></el-button>
    <el-button v-else class="confirm full" @click="newPartDialog = !newPartDialog" :icon="Plus"></el-button>

    <el-drawer v-model="newPartDialog" title="定义新零件" direction="ltr">
        <el-form class="form">
            <el-form-item label="名称" :label-width="100">
                <el-input v-model="name" type="text" placeholder="enter name" />
            </el-form-item>

            <el-form-item label="是否为部件" :label-width="100">
                <el-switch v-model="isFolder" />
            </el-form-item>


            <div v-if="!isFolder">
                <el-form-item label="质量" :label-width="100">
                    <el-input-number v-model="weight" :precision="3" />
                </el-form-item>
                <el-form-item label="x" :label-width="100">
                    <el-input-number v-model="c_x" :precision="3" />
                </el-form-item>
                <el-form-item label="y" :label-width="100">
                    <el-input-number v-model="c_y" :precision="3" />
                </el-form-item>
                <el-form-item label="z" :label-width="100">
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
</template>


<style>
.el-drawer {
    width: 38.2% !important;
}
.el-overlay {
    background-color: rgba(0, 0, 0, 0.2)}
.confirm {
    height: 2.5em;
    background-color: #e6e6e6;
    border-radius: 10px;
    border: 0;
}
.full {
    border-radius: 10px !important;
}
.confirm:hover {
    background-color: rgb(46, 133, 255);
    color: rgb(46, 133, 255);
}
.confirm:active {
    background-color: rgb(0, 106, 255);
}
</style>