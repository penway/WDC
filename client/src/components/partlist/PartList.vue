<script setup>
import { Folder, Cpu } from '@element-plus/icons-vue'
import { traceName, traceID, isPart, searchParts, localSearch, currentPart, parts, projects  } from "@/globe"
import { ElMessage } from 'element-plus'
import EditButton from "./EditButton.vue"
import MoveButton from "./MoveButton.vue"
import DeleteButton from "./DeleteButton.vue"
import NewPartButton from "./ButtonNewPart.vue"

const forward = (row) => {
    if (row.isFolder) {
        traceID.value.push(row._id)
    }
    else {
        ElMessage({
            message: '这是一个零件。', 
            grouping: true,
            showClose: true,
        })
    }
}

</script>

<template>

    <div class="head">
        <span class="new-part-button">
            <new-part-button />
        </span>
        <span class="headerii"><b>{{ traceName[traceName.length - 1] }}</b></span>
        <span class="headerii-info" v-if="traceID.length > 1">
            {{ currentPart.weight }} kg
            ({{ currentPart.c_x.toFixed(2) }},
            {{ currentPart.c_y.toFixed(2) }},
            {{ currentPart.c_z.toFixed(2) }})
        </span>
        <input class="local-search" v-model="localSearch" placeholder="搜索当前部件" />
    </div>

    <el-table :data="searchParts" height="75vh" @row-dblclick="forward($event)" stripe>

        <el-table-column prop="name" label="名称" width="210%" sortable>
            <template #default="scope">
                <el-icon v-if="scope.row.isFolder">
                    <Folder />
                </el-icon>
                <el-icon v-else>
                    <Cpu />
                </el-icon>
                &ThickSpace;
                <span class="nameRow" @click="forward(scope.row)">
                    {{ scope.row.name }}
                </span>
            </template>
        </el-table-column>
        <el-table-column prop="weight" label="质量 (kg)" sortable/>

        <el-table-column label="坐标">
            <el-table-column prop="x2" label="x" />
            <el-table-column prop="y2" label="y" />
            <el-table-column prop="z2" label="z" />
            <!-- <el-table-column prop="parentID" label="parentID" /> -->
            <!-- <el-table-column prop="isFolder" label="isFolder" /> -->
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="180%">
            <template #default="scope">
                <el-button-group>
                    <edit-button :name="scope.row.name" :weight="scope.row.weight" :c_x="scope.row.c_x"
                        :c_y="scope.row.c_y" :c_z="scope.row.c_z" :_id="scope.row._id" :isFolder="scope.row.isFolder" />
                    <move-button :_id="scope.row._id" />
                    <delete-button :_id="scope.row._id" />
                </el-button-group>
            </template>
        </el-table-column>

    </el-table>
</template>

<style>
/* .el-table--enable-row-hover,  */
.el-table__body tr:hover > td {
    background-color: #bdcad7 !important;
    color: #0b3c76 !important;
    cursor: pointer;
}
.nameRow:hover {
    text-decoration: underline;
}
.new-part-button {
    vertical-align: text-top;
}
.el-table {
    width: 100%;
}
.head {
    padding: 1em;
    display: flex;
    vertical-align: center;
    caret-color: transparent;
}
.headerii {
    margin-left: 1em;
    font-size: 1.5em;
    font-family: 'Lucida Sans';
}
.headerii-info {
    margin-left: 1em;
    margin-bottom: 1em;
    padding: 0.5em 1em 0.2em 1em;

    border-radius: 10px;
    font-size: 1em;

    transition: all 0.2s ease-in-out;
}
.headerii-info:hover {
    box-shadow: 0 0 5px 1px #b5b5b5;
}
input.local-search {
    width: 7vw;
    height: 2.5em;

    position: absolute;
    right: 1.2em;
    padding-left: 1em;

    border-radius: 10px;
    border: 0;
    background-color: #eaeaea;

    caret-color: #07264a;

    transition: all 0.2s ease-in-out;
}
input.local-search:hover, input.local-search:focus {
    box-shadow: -20px 0px 0px 0px #2f5499;
    background-color: #dcdcdc;
    width: 11vw;
    outline: none;
}
</style>