<script setup>
import { traceCname, traceCID } from "../globe"
</script>

<template>
    <el-breadcrumb separator="=>">
        <el-breadcrumb-item>
            <el-button link @click="">Soarie20</el-button>
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="traceCID != 0">
            <el-button link>{{ traceCname }}</el-button>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>