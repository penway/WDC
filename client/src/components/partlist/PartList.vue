<script setup>
import { ref } from 'vue'
import { Folder, Cpu, ArrowLeftBold } from '@element-plus/icons-vue'
import { traceName, traceID, isPart, searchParts, localSearch, currentPart, parts, projects, multipleSelection, multipleTableRef  } from "@/globe"
import { ElMessage } from 'element-plus'
import EditButton from "./EditButton.vue"
import MoveButton from "./MoveButton.vue"
import DeleteButton from "./DeleteButton.vue"
import NewButton from "./NewButton.vue"
import DuplicateButton from './DuplicateButton.vue'



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

const clip = () => {
    var text = ""
    searchParts.value.forEach((part) => {
        text += part.name + "\t"
        text += part.weight + "\t"
        text += part.c_x + "\t"
        text += part.c_y + "\t"
        text += part.c_z
        text += "\n"
    })
    navigator.clipboard.writeText(text).then(() => {
        ElMessage({
            message: '已复制表格信息至剪贴板', 
            grouping: true,
            showClose: true,
        })
    })
}

const handleSelectionChange = (val) => {
    multipleSelection.value = val
}

const toggleSelection = (row) => {
    multipleTableRef.value.toggleRowSelection(row, undefined)   
}

const back = () => {

    traceID.value.pop()
    localSearch.value = ""
}
</script>

<template>

    <div class="head">
        <span class="new-part-button">
            <el-button @click="back" plain class="back" :icon="ArrowLeftBold"></el-button>
        </span>
        <span class="headerii" @click="clip"><b>{{ traceName[traceName.length - 1] }}</b></span>
        <span class="headerii-info" v-if="traceID.length > 1">
            {{ currentPart.weight.toFixed(3) }} kg
            ({{ currentPart.c_x.toFixed(2) }},
            {{ currentPart.c_y.toFixed(2) }},
            {{ currentPart.c_z.toFixed(2) }})
        </span>
        
    </div>

    <el-button-group class="ops" >
        <new-button />
        <edit-button v-if="multipleSelection.length == 1"/>
        <move-button v-if="multipleSelection.length > 0"/>
        <delete-button v-if="multipleSelection.length > 0"/>
        <DuplicateButton v-if="multipleSelection.length > 0"/>
    </el-button-group>
    <input class="local-search" v-model="localSearch" placeholder="搜索当前部件" />

    <el-table :data="searchParts" height="75vh" 
        ref="multipleTableRef"
        stripe
        @row-click="toggleSelection"
        @row-dblclick="forward"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" />
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
        <el-table-column prop="w2" label="质量 (kg)" sortable />

        <el-table-column label="质心坐标">
            <el-table-column prop="x2" label="x" />
            <el-table-column prop="y2" label="y" />
            <el-table-column prop="z2" label="z" />
            <!-- <el-table-column prop="parentID" label="parentID" /> -->
            <!-- <el-table-column prop="isFolder" label="isFolder" /> -->
        </el-table-column>

        <!-- <el-table-column fixed="right" label="操作" width="180%">
            <template #default="scope">
                <el-button-group>
                    <edit-button :name="scope.row.name" :weight="scope.row.weight" :c_x="scope.row.c_x"
                        :c_y="scope.row.c_y" :c_z="scope.row.c_z" :_id="scope.row._id" :isFolder="scope.row.isFolder" />
                    <move-button :_id="scope.row._id" />
                    <delete-button :_id="scope.row._id" />
                </el-button-group>
            </template>
        </el-table-column> -->

    </el-table>
</template>

<style>
.back {
    border: 0;
    border-radius: 10px;
    transition: 0.3s ease-in-out;
    background-color: #eaeaea00;
}
.back:hover {
    color: black;
    background-color: #ececec;
}

.ops {
    position: relative;
    left: 20px;
    margin-bottom: 20px;
}
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
    transition: all 0.2s ease-in-out;
}
.headerii:hover {
    cursor: pointer;
    color: #2f5499;
}
.headerii-info {
    margin-left: 1em;
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