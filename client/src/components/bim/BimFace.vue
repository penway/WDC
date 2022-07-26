<script setup>
import "./BimfaceSDKLoader.js"
import { parts } from "../../globe"

const viewToken = '9d1663de53d94cc0a8e65b284305885e';
var viewer3D;
var app;

// 配置JSSDK加载项
window.onload = function () {
    var loaderConfig = new BimfaceSDKLoaderConfig();
    loaderConfig.viewToken = viewToken;
    BimfaceSDKLoader.load(loaderConfig, successCallback, failureCallback);
}
// 加载成功回调函数
function successCallback(viewMetaData) {
    var dom4Show = document.getElementById('domId');
    // 设置WebApplication3D的配置项
    var webAppConfig = new Glodon.Bimface.Application.WebApplication3DConfig();
    webAppConfig.domElement = dom4Show;
    // 创建WebApplication3D，用以显示模型
    app = new Glodon.Bimface.Application.WebApplication3D(webAppConfig);
    app.addView(viewToken);
    viewer3D = app.getViewer();
}
// 加载失败回调函数
function failureCallback(error) {
    console.log(error);
}


// ************************** 内建三维标签 **************************
function addMarker(x, y, z) {
    // 构造三维标签容器配置markerContainerConfig
    var markerContainerConfig = new Glodon.Bimface.Plugins.Marker3D.Marker3DContainerConfig();
    // 设置markerContainerConfig匹配的viewer对象
    markerContainerConfig.viewer = viewer3D;
    // 构造三维标签容器markerContainer
    var markerContainer = new Glodon.Bimface.Plugins.Marker3D.Marker3DContainer(markerContainerConfig);
    // 构造三维标签配置项
    var markerConfig = new Glodon.Bimface.Plugins.Marker3D.Marker3DConfig();
    // 为标签指定图片路径
    markerConfig.src = "http://static.bimface.com/resources/3DMarker/warner/warner_red.png";
    // 构造点位，并指定为标签的插入点
    var markerPos = { "x": x, "y": y, "z": z };
    markerConfig.worldPosition = markerPos;
    console.log("AA")
    // 指定标签大小
    markerConfig.size = 60;
    // 构造三维标签
    var marker = new Glodon.Bimface.Plugins.Marker3D.Marker3D(markerConfig);
    // 添加标签的点击事件
    marker.onClick(function () {
        window.alert('Warning!');
    });
    // 将三维标签添加至容器内
    markerContainer.addItem(marker);
}

function makeMarkers() {
    parts.value.forEach((part) => {
        addMarker(part.c_x, part.c_y, part.c_z)
    })
}
</script>

<template>
    <div>
        <div id="domId" class="domClass"/>
        <!-- <div class="bimController"/> -->
        <button class="button" id="btnAddMarker" @click="makeMarkers">放置三维标签</button>
    </div>
</template>

<style>

.domClass {
    width: 36.5vw;
    height: 70vh;
    border-radius: 0px 0px 20px 20px;

    transition: all 0.5s ease-in-out;
}
.domClass:hover {
    box-shadow: 0px 0px 8px 2px #888888;
}
.bf-house {
    width: 0px !important;
    height: 0px !important;
}
.bf-menu-svg {
    width: 0px !important;
    height: 0px !important;
}
.bf-home-svg {
    position: absolute !important;
    top: 28vh !important;
    left: -64vw !important;
    width: 30px !important;
    height: 30px !important;
}
.bimController {
    background-color: #1157aa;
    /* box-shadow: 0 0 6px 1px #121212; */
    width: 160px;
    height: 150px;
    position: fixed;
    right: 0;
    top: 0;
}
</style>