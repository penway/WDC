<script setup>
import { components, traceCID, traceCname } from "../globe"
import EditButton from "./EditButton.vue"
import DeleteButton from "./DeleteButton.vue"

function intoChild(id, name) {
    traceCID.value = id
    traceCname.value = name
}
</script>

<template>
    <el-table :data="components" height="420px" style="width: 100%; " stripe>
    
        <el-table-column label="Name"> 
            <template #default="scope">
                <el-button link @click="intoChild(scope.row._id, scope.row.name)">
                    {{ scope.row.name }}
                </el-button>
            </template>
        </el-table-column>
        <el-table-column prop="weight" label="Weight (kg)" />

        <el-table-column label="Coordinate">
            <el-table-column prop="c_x" label="x" />
            <el-table-column prop="c_y" label="y" />
            <el-table-column prop="c_z" label="z" />
        </el-table-column>

        <el-table-column label="Operations" width="210px">
            <template #default="scope">
                <el-button-group>
                    <el-button plain @click="intoChild(scope.row._id, scope.row.name)">Check</el-button>
                    <edit-button :name="scope.row.name" :weight="scope.row.weight" :c_x="scope.row.c_x"
                        :c_y="scope.row.c_y" :c_z="scope.row.c_z" :_id="scope.row._id" />
                    <delete-button :_id="scope.row._id" :index="scope.$index" />
                </el-button-group>
            </template>
        </el-table-column>
    </el-table>
</template>