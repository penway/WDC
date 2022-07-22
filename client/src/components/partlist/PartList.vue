<script setup>
import { traceName, traceID, isPart, searchParts, localSearch } from "../../globe"
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
    <h2>{{ traceName[traceName.length - 1] }}</h2>

    <new-part-button />

    <el-input v-model="localSearch" placeholder="Local Search"/>
    <el-table :data="searchParts" stripe>

        <el-table-column prop="name" label="Name">
            <template #default="scope">
                <el-button link @click="forward(scope.row._id, scope.row.name, scope.row.isFolder)">
                    {{ scope.row.name }}
                </el-button>
            </template>
        </el-table-column>
        <el-table-column prop="weight" label="Weight (kg)" />

        <el-table-column label="Coordinate">
            <el-table-column prop="c_x" label="x" />
            <el-table-column prop="c_y" label="y" />
            <el-table-column prop="c_z" label="z" />
            <!-- <el-table-column prop="parentID" label="parentID" /> -->
            <!-- <el-table-column prop="isFolder" label="isFolder" /> -->
        </el-table-column>

        <el-table-column fixed="right" label="Operations" width="210%">
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
.el-table th{
    background: rgb(143, 0, 0);
  }
</style>