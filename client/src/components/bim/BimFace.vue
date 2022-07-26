<template>
    <div>
        <div id="domId" class="domClass"/>
        <!-- <div class="bimController"/> -->
    </div>
</template>

<script setup>
import "./BimfaceSDKLoader.js"
let viewer3D;
const viewToken = '890e161c186e49bd9ae7b258bf90ac0b';

const loaderConfig = new BimfaceSDKLoaderConfig();
loaderConfig.viewToken = viewToken;
BimfaceSDKLoader.load(
    loaderConfig,
    (viewMetaData) => {
        const domShow = document.getElementById('domId');
        const webAppConfig = new Glodon.Bimface.Viewer.Viewer3DConfig();
        webAppConfig.domElement = domShow;
        const app = new Glodon.Bimface.Viewer.Viewer3D(webAppConfig);
        app.addView(viewToken);
        viewer3D = app.getViewer();
    },
    (error) => {
        console.log(error);
    }
);

</script>

<style>

.domClass {
    width: 36.5vw;
    height: 72vh;
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