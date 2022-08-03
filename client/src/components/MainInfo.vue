<script setup>
import { weight_sum, cox, coy, coz } from "@/globe"
</script>


<template>
    <div class="main-info" @click="make()">
        总质量
        {{ weight_sum }} kg &nbsp&nbsp&nbsp&nbsp&nbsp
        重心
        ({{ cox }}, 
        {{ coy }}, 
        {{ coz }})
    </div>
</template>


<style scoped>
.main-info {
    position: relative;
    top: -7vh;
    z-index: 200;
    width: 34.5vw;
    margin-left: 1vw;
    height: 4vh;

    border-radius: 3vh;
    color: white;
    background-color: #00459aae;
    padding: 1vh 0 0vh 0;
    /* margin-bottom: 1em; */
    font-size: 2vh;

    text-align: center;

    transition: all 0.5s ease-in-out;
}
.main-info:hover {
    background-color: #00459ac9;
    /* box-shadow: 0px 0px 8px 2px #888888; */
}   
</style>