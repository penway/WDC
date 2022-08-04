<script setup>
// 显示3D模型的组件，调用的是 广联达BIMFACE 的接口
// 相关的文档和学习资料 https://bimface.com/

import { watch } from "vue"
import "./BimfaceSDKLoader.js"
import { currentPart, searchParts, projects, currentProjectID } from "@/globe"

// 获取 AccessToken
// const appAPI = 'https://api.bimface.com/oauth2/token'
// const appKey = 'KS3gpwmw7i5hiTFeBHWWrMdhkJQ3ELif'
// const appSecret = '9WVj7tnlF78eF9ty3dq8SbjNjYoF5VDY'
// const appAuthor = 'Basic ' + btoa(appKey + ':' + appSecret)
// console.log(appAuthor)
// const appHeader = { headers: { 'Authorization': appAuthor, 'Content-Type': 'application/json'}}
// axios.post(appAPI, appHeader)
//     .then(response => {
//         console.log(response)
//     })
//     .catch((e) => {
//             console.log(e);
//     })

// const fileId = '10000754336351'
// const viewAPI = 'https://api.bimface.com/view/token?fileId='

// const authorization = { 
//     Authorization: 'Bearer cn-e9725999-0b36-4c0e-bdca-38ea88888888'
//     }

// 获取 viewToken
// console.log("Shit started")
// axios.get(viewAPI+fileId, { headers: authorization })
//     .then(response => {
//         console.log(response)
//     })
//     .catch((e) => {
//             console.log(e);
//     })


// get viewToken
const currentProjectViewToken = projects.value.find(
    project => project._id == currentProjectID.value).viewToken

var viewToken
if (currentProjectViewToken == 'placeholder') {
    viewToken = 'd2ab2968c0cf4276bf28125e2843ed4b'
}
else
    viewToken = currentProjectViewToken


var app
var model3D
var viewer3D
var markerContainer

// 配置JSSDK加载项
var loaderConfig = new BimfaceSDKLoaderConfig()
loaderConfig.viewToken = viewToken
BimfaceSDKLoader.load(loaderConfig, successCallback, failureCallback)

// 加载成功回调函数，主要的配置内容都在此函数中
function successCallback(viewMetaData) {
    var dom4Show = document.getElementById('domId');
    // 设置WebApplication3D的配置项
    var webAppConfig = new Glodon.Bimface.Application.WebApplication3DConfig();
    webAppConfig.domElement = dom4Show;
    // 创建WebApplication3D，用以显示模型
    app = new Glodon.Bimface.Application.WebApplication3D(webAppConfig);
    app.addView(viewToken);
    viewer3D = app.getViewer()
    viewer3D.enableHover(true)  // 允许获得鼠标悬停事件
    

    //自适应屏幕大小
    window.onresize = function () {
        viewer3D.resize(document.documentElement.clientWidth, document.documentElement.clientHeight - 40)
    }

    // 加载完成后初始化
    viewer3D.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.ViewAdded, () => {
        model3D = viewer3D.getModel()
        
        makeMarkers()
        transparentAll()
    });

    viewer3D.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.ComponentsHoverChanged, 
        (data) => { model3D.deactivateComponentsById([data.elementId]) }
    )
    
    makeMarkerContainer()

    watch(searchParts, () => { makeMarkers() })  // 监听更新，有零件的更新就自动更新点位
}
// 加载失败回调函数
function failureCallback(error) {
    alert("模型加载失败；有可能是 ViewToken 已失效，请注意替换")
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

function addMarker(part, isParent) {
    
    var marker = new Glodon.Bimface.Plugins.Marker3D.Marker3D(new Glodon.Bimface.Plugins.Marker3D.Marker3DConfig());  // 构造三维标签

    if (isParent) {
        marker.setSrc(require('../../assets/spotP.png'))
    } else {
        marker.setSrc(require('../../assets/spot.png'))
    }
    marker.setSize(30)
    marker.setWorldPosition({ "x": part.c_x, "y": part.c_y, "z": part.c_z })
    // 添加标签的点击事件
    // marker.onClick(() => {
    //     ElMessage({
    //         message: part.name,
    //         grouping: true,
    //     })
    // });
    marker.setTooltip(part.name + " " + part.weight.toFixed(1) + "kg");
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
        addMarker(part, false)
        console.log("1")
    })
    if (searchParts.value.length > 0)  // 加这一行是因为返回到主页面的时候没有currentPart
        addMarker(currentPart.value, true)
}

const transparentAll = () => {
    let color = new Glodon.Web.Graphics.Color("#E0E0E0", 0.3);
    model3D.overrideAllComponentsColor(color);
    viewer3D.render();
}
</script>

<template>
    <div>
        <div id="domId" class="domClass"/>
    </div>
</template>

<style>

.domClass {
    width: 36.5vw;
    height: 80vh;
    border-radius: 4vh;
    border: 2px solid #1157aa;
    transition: all 0.5s ease-in-out;
}
.domClass:hover {
    /* box-shadow: 0px 30px 0px 0px #1157aa; */
    border: 2px solid #1157aa;
}
.bf-container {
    border-radius: 4vh!important;
}
.bf-house, .bf-menu-svg, 
.bf-toolbar-bottom, .bf-tree-toolbar
{
    width: 0px !important;
    height: 0px !important;
    position: static !important;
}
.bf-home-svg {
    position: absolute !important;
    top: 12px !important;
    right: 12px !important;
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