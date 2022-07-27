<script setup>
import { ElMessage } from 'element-plus'
import "./BimfaceSDKLoader.js"
import { parts, searchParts } from "../../globe"

const viewToken = '9d1663de53d94cc0a8e65b284305885e';
var viewer3D;
var app;
var markerContainer

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

    makeMarkerContainer()
}
// 加载失败回调函数
function failureCallback(error) {
    console.log(error);
}
function makeMarkerContainer() {
    // 构造三维标签容器配置markerContainerConfig
    var markerContainerConfig = 
        new Glodon.Bimface.Plugins.Marker3D.Marker3DContainerConfig();
    markerContainerConfig.viewer = viewer3D;  // 设置markerContainerConfig匹配的viewer对象
    // 构造三维标签容器markerContainer
    markerContainer = 
        new Glodon.Bimface.Plugins.Marker3D.Marker3DContainer(markerContainerConfig);
}
function addMarker(part) {
    // 构造三维标签配置项
    var markerConfig = new Glodon.Bimface.Plugins.Marker3D.Marker3DConfig();
    
    markerConfig.src = "http://static.bimface.com/resources/3DMarker/warner/warner_red.png";  // 为标签指定图片路径

    // 构造点位，并指定为标签的插入点
    markerConfig.worldPosition = 
        { "x": part.c_x, "y": part.c_y, "z": part.c_z };  
    markerConfig.size = 30;  // 指定标签大小
    
    var marker = new Glodon.Bimface.Plugins.Marker3D.Marker3D(markerConfig);  // 构造三维标签

    // 添加标签的点击事件
    marker.onClick(() => {
        ElMessage(part.name)
    });
    
    markerContainer.addItem(marker);  // 将三维标签添加至容器内
}

const makeMarkers = () => {
    markerContainer.clear()
    searchParts.value.forEach((part) => {
        addMarker(part)
    })
}
</script>

<template>
    <div>
        <div id="domId" class="domClass"/>
        <button class="button" id="btnAddMarker" @click="makeMarkers">
            显示零件位置
        </button>
    </div>
</template>

<style>

.domClass {
    width: 36.5vw;
    height: 68vh;
    border-radius: 0px 0px 20px 20px;

    transition: all 0.5s ease-in-out;
}
.domClass:hover {
    box-shadow: 0px 0px 8px 2px #888888;
}
.bf-container {
    border-radius: 0px 0px 20px 20px !important;
}
.bf-house, .bf-menu-svg, 
.bf-toolbar-bottom
{
    width: 0px !important;
    height: 0px !important;
    position: static !important;
}
.bf-home-svg {
    position: absolute !important;
    top: 10px !important;
    right: 5px !important;
    /* width: 30px !important;
    height: 30px !important; */
}
</style>