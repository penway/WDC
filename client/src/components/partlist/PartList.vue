<script setup>
import { traceName, traceID, isPart, searchParts, localSearch, currentParts } from "../../globe"
import EditButton from "./EditButton.vue"
import MoveButton from "./MoveButton.vue"
import DeleteButton from "./DeleteButton.vue"
import NewPartButton from "./ButtonNewPart.vue"

const forward = (id, name, isFolder) => {
    traceID.value.push(id)
    traceName.value.push(name)
    isPart.value = !isFolder
}
</script>

<template>

    <div class="head">
        <span class="new-part-button"><new-part-button/></span>
        <span class="headerii"><b>{{ traceName[traceName.length - 1] }}</b></span>
        <input v-model="localSearch" placeholder="搜索当前部件"/>
    </div>

    
    <el-table :data="searchParts" stripe height="70vh">

        <el-table-column prop="name" label="名称">
            <template #default="scope">
                <el-button link @click="forward(scope.row._id, scope.row.name, scope.row.isFolder)">
                    {{ scope.row.name }}
                </el-button>
            </template>
        </el-table-column>
        <el-table-column prop="weight" label="质量 (kg)" />

        <el-table-column label="坐标">
            <el-table-column prop="c_x" label="x" />
            <el-table-column prop="c_y" label="y" />
            <el-table-column prop="c_z" label="z" />
            <!-- <el-table-column prop="parentID" label="parentID" /> -->
            <!-- <el-table-column prop="isFolder" label="isFolder" /> -->
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="210%">
            <template #default="scope">
                <el-button-group>
                    <edit-button :name="scope.row.name" :weight="scope.row.weight" :c_x="scope.row.c_x"
                        :c_y="scope.row.c_y" :c_z="scope.row.c_z" :_id="scope.row._id" 
                        :isFolder="scope.row.isFolder" />
                    <move-button :_id="scope.row._id" />
                    <delete-button :_id="scope.row._id" />
                </el-button-group>
            </template>
        </el-table-column>

    </el-table>
</template>

<style scoped>
.new-part-button {
    vertical-align: text-bottom;
}
.el-table {
    width: 100%;
}
.head {
    padding: 1em;
    display: flex;
    vertical-align: center;
}
.headerii {
    margin-left: 1em;
    font-size: 1.5em;
    font-family: 'Lucida Sans';
}
input {
    float: right;
    width: 20vw;
    height: 2.5em;

    position: absolute;
    right: 1.2em;

    border-radius: 10px;
    border: 0;
    background-color: #e4effc;

    caret-color: #07264a;
}
input::placeholder {
    padding-left: 1em;
}
input:hover {
    box-shadow: 0px 0px 6px 1px #888888;
}
input:focus {
    outline: none;
    box-shadow: 0;
    background-color: #e9e9e9;
}

</style>