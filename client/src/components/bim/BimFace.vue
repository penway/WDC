<template>
    <div>
        <div id="domId" style="width:19vw; height:30vh; border-radius: 10px;"/>
    </div>
</template>

<script setup>
import "./BimfaceSDKLoader.js"
let viewer3D;
const viewToken = '7a4908f06b2847489d4158e90e47c0b9';

const loaderConfig = new BimfaceSDKLoaderConfig();
loaderConfig.viewToken = viewToken;
BimfaceSDKLoader.load(
    loaderConfig,
    (viewMetaData) => {
        const domShow = document.getElementById('domId');
        const webAppConfig = new Glodon.Bimface.Application.WebApplication3DConfig();
        webAppConfig.domElement = domShow;
        const app = new Glodon.Bimface.Application.WebApplication3D(webAppConfig);
        app.addView(viewToken);
        viewer3D = app.getViewer();
    },
    (error) => {
        console.log(error);
    }
);

</script>