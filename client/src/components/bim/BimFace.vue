<script setup>
import { watch } from "vue"
import "./BimfaceSDKLoader.js"
import { parts, searchParts } from "../../globe"

const viewToken = '9d1663de53d94cc0a8e65b284305885e';
var viewer3D;
var model3D;
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
    

    //自适应屏幕大小
    window.onresize = function () {
            viewer3D.resize(document.documentElement.clientWidth, document.documentElement.clientHeight - 40)
    }

    // 加载完成后初始化
    viewer3D.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.ViewAdded, () => {
        model3D = viewer3D.getModel();
        makeMarkers()
        transparentAll()
    });
    
    makeMarkerContainer()

    watch(searchParts, () => { makeMarkers() })  // 监听更新，有零件的更新就自动更新点位
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
    
    var marker = new Glodon.Bimface.Plugins.Marker3D.Marker3D(new Glodon.Bimface.Plugins.Marker3D.Marker3DConfig());  // 构造三维标签

    marker.setSrc(require('../../assets/spot.png'))
    marker.setSize(30)
    marker.setWorldPosition({ "x": part.c_x, "y": part.c_y, "z": part.c_z })
    // 添加标签的点击事件
    // marker.onClick(() => {
    //     ElMessage({
    //         message: part.name,
    //         grouping: true,
    //     })
    // });
    marker.setTooltip(part.name);
    // marker.onHover(() => {
    //     ElMessage({
    //         message: part.name,
    //         grouping: true,
    //     })
    // });
    
    markerContainer.addItem(marker);  // 将三维标签添加至容器内
}

const makeMarkers = () => {
    markerContainer.clear()
    searchParts.value.forEach((part) => {
        addMarker(part)
    })
}

const transparentAll = () => {
    let color = new Glodon.Web.Graphics.Color("#E0E0E0", 0.3);
    console.log(model3D)
    model3D.overrideAllComponentsColor(color);
    viewer3D.render();
}


</script>

<template>
    <div>
        <div id="domId" class="domClass"/>
        <!-- <button class="button" id="btnAddMarker" @click="makeMarkers">
            显示零件位置
        </button> -->
        <!-- <button class="button" @click="transparentAll">
            TR
        </button> -->
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
.bf-tooltip {
    color: white !important;
    background-color: #1157aa !important;
    padding: 1px 5px 1px 5px;
    border-radius: 5px;
    border: none !important;
}
</style>