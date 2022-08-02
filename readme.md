# 重量管理系统

本系统希望实现整车零件的质量管理与版本管理，能够复用标准件、设置对称件；追踪不同版本、不同赛季的质量变化；为整车的动力学仿真以及设计轻量化总体目标提供参考依据。在以后的功能中，或许能够增加文件管理系统，使得车队整体的管理流程电子化、规范化。

同时本项目是我个人学习前后端开发的第一个项目，必然存在诸多设计上的不足以及技术上的缺陷。

## 系统架构与开发计划
![系统架构预览图](./versions-pic/design_doc/System-Structure.png)
![零件数据结构设计](./versions-pic/design_doc/PartDatabase.png)

1. 最先希望实现的功能即“系统-部件-零件”的逻辑关系，保证每个系统能够被方便地编辑。
    - 借用了UG的思路，现在分为“文件夹”和“零件”两种：文件夹本身没有重量，重量自动计算；零件才能定义重量

2. 让通用件（标准件）可以在多处使用，建立相对独立地引用机制。同时对称地部件可以自动生成（主要是悬架系统）

3. 建立项目的概念，让不同赛季的车可以进行升级对比

4. 增加附件，从重量管理升级为更加综合的辅助工具。能够到处excel格式的物料清单，并自动导出一些图片辅助制作报告。

## 安装指南
本项目目前仅仅可以从源码部署，下面提供部署的方法。本项目依赖于 MVNE stack，即 MongoDB, Express.js, VueJS, Node.js。因此需要安装 node.js，和 MongoDB。
下面的安装方法针对 Windows，若您会使用 Linux，相信安装起来不成问题。

### 环境准备

1. 首先下载 [MongoDB 的 Windows 安装包](https://www.mongodb.com/try/download/community)，我使用的是 6.0.0 版本。正常安装即可，注意运行的端口号，我编程使用的是默认的 27017。

    ![MongoDB](./versions-pic/install/mongo.png)

2. 接下来使用git或直接下载源码。`Code > Download ZIP` 如图，然后解压即可。
    ![git](./versions-pic/install/git.png)

3. 最后下载 [Node.js](https://nodejs.org/en/download/)，注意下载的版本为 16 即可。
    ![node](./versions-pic/install/node.png)

### 安装 Node.js 环境

1. 打开你的命令行窗口，可能是 Windows Terminal，也可以是 cmd 或 Powershell。
2. 输入 `node --version` 查看 node.js 是否安装完成。
3. 前往 WDC 文件夹。
    示例：`cd "E:\Caldron\WDC\"`
4. 进入 client 并执行 npm install
    `cd client && npm install`
5. 进入 server 并执行 npm install
    `cd ..\server && npm install`

### 运行

呆在server文件夹中，执行`npm run dev`观察输出结果，若无报错即可打开网页 localhost:8080。