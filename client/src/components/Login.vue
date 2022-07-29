<script setup>
import { ref } from 'vue'
import { router } from '../main'
import { admin } from '@/globe';

const adminCode = "SRT"
const inputCode = ref("")

const visit = () => {
    admin.value = false
    router.push('/main')
}
const adminLogin = () => {
    if (inputCode.value == adminCode) {
        admin.value = true
        router.push('/main')
    } else {
        alert("Wrong CODE")
    }
}
</script>

<template>
    <div class="logologin"><img src="@/assets/srticon.png" alt="" class="logo"/></div>
    <div class="form">
    <!-- <form v-on:submit="login"> -->
        <input v-model="inputCode" placeholder="Input Code"/>
        <button @click="visit()" class="visit">Visitor</button>
        <button @click="adminLogin()" class="admin">Admin</button>
    <!-- </form> -->
    </div>
</template>

<style scoped>
div {
    caret-color: transparent;
    transition: all 0.2s ease-in-out;
}
div.logologin {
    margin: 20vh auto 5vh auto;
    width: 30vw;
}
img {
    width: 30vw;
}
div.form {
    margin: auto;
    width: calc(60vw + 20px);
    border-radius: 40px;
}
div.form:hover {
    box-shadow: 0 0 10px 2px #a6a6a6;
}
input {
    width: 40vw;
    height: 60px;
    outline: none;
    border: none;
    border-radius: 40px 0px 0px 40px;
    
    padding: 0 0 0 20px;
    background-color: #c4cedc;

    font-size: 1.2em;

    caret-color: #053983;
}
input:hover, input:focus {
    outline: none;
    background-color: #acbcd3;
}
button {
    width: 10vw;
    height: 60px;
    border: none;
    outline: none;
    padding: 0;
    margin: 0;

    font-size: 1.2em;
}
.visit {
    background-color: #6f8ec4;
    color: white;
}
.visit:hover {
    background-color: #5982c9;
}

.admin {
    background-color: #193f81;
    border-radius: 0px 40px 40px 0px;
    color: white;
}
.admin:hover {
    background-color: #072e71;
}
</style>