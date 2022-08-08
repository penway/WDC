<script setup>
import axios from 'axios'
import { projectAPI, projects } from '@/globe.js'
import { ref } from 'vue'

const props = defineProps([
    "_id",
    "name",
    "year",
    "viewToken",
])

const editProjectDialog = ref(false)
const name = ref("")
const year = ref("")
const viewToken = ref("")

const dialogVisible = ref(false)
const confirmText = ref("")

const onEditClick = () => {
    name.value = props.name
    year.value = props.year
    viewToken.value = props.viewToken
    editProjectDialog.value = true
}

const editProjectButtonPressed = async () => {
    const response = await axios.patch(projectAPI + props._id, {
        name: name.value,
        year: year.value,
        viewToken: viewToken.value
    })

    projects.value = response.data
    projects.value.sort((a, b) => a.year - b.year)

    editProjectDialog.value = false
}

const deleteProject = async () => {
    const response = await axios.delete(projectAPI + props._id)
    projects.value = response.data
    projects.value.sort((a, b) => a.year - b.year)
    
    editProjectDialog.value = false
    dialogVisible.value = false
}

const confirmDeletion = async () => {
    if (confirmText.value == props.name) {
        await deleteProject()
    } else {
        alert("输入错误")
        dialogVisible.value = false
    }
    confirmText.value = ""
}


</script>

<template>
    <button class="edit" @click="onEditClick">编辑</button>
    <Transition>
        <div v-if="editProjectDialog" class="x-overlay"/>
    </Transition>
    <el-dialog v-model="editProjectDialog" title="编辑项目">
        <el-form class="form">
            <el-form-item label="名称" :label-width="80">
                <el-input v-model="name" type="text"/>
            </el-form-item>
            <el-form-item label="赛季" :label-width="80">
                <el-input v-model="year" type="number"/>
            </el-form-item>
            <el-form-item label="view token" :label-width="80">
                <el-input v-model="viewToken" type="text"/>
            </el-form-item>
            <el-form-item label="" :label-width="80">
            <el-button type="primary" @click="editProjectButtonPressed()">
                确定
            </el-button>
            <el-button type="danger" @click="dialogVisible = true">
                删除
            </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>

    <el-dialog
        v-model="dialogVisible"
        title="危险！你在尝试删除一整个项目。"
        width="30%"
    >
    <span class="disabledText">请输入项目名称 <b>{{ props.name }}</b> 确认删除</span>
    <br/><br/>
    <el-input v-model="confirmText"></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="danger" @click="confirmDeletion">
        确认删除
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
button.edit {
    position: absolute;
    top: 105px;
    left: 70px;
    width: 160px;
    height: 10px;
    border-radius: 25px;
    border: none;
    background-color: #0068e652;
    color: rgba(24, 24, 24, 0);

    transition: all 0.2s ease-in-out;
}
button.edit:hover {
    left: 50px;
    width: 200px;
    top: 98px;
    height: 24px;
    cursor: pointer;
    color: white;
    background-color: #1156aaca;
}
.el-input {
    caret-color: black;
}
.disabledText {
    user-select: none;
}
</style>