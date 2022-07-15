### 7/12

尝试使用 MEVN 搭建一个项目 [参考文章](https://signoz.io/blog/mevn-stack-tutorial/#proxy-api-requests-from-the-vue-app)

目前使用的是 `MEVN + Element-plus`

完成了一个简单的待办事项的搭建


### 7/13

上午完成了从待办事项到基础的质心计算器的转移工作

下午
- 对页面进行了基本的布局
- 增加编辑按钮
- 增加删除确认
- 新增和编辑由弹窗完成


### 7/14
上午
- 重构 vue 的 script 代码，从 Options 转变为 Composition，即 <script setup>
- 将API的返回值改为增量式更新，两端保持同步，而非之前的每次传回整个零件列表

下午
- 将所有内容组件化


### 7/15
- 后端：添加了一个数据类型：Component，逻辑上 component 包含 part
- 已经完成了基础功能，添加和显示没有问题，在删和改上还需要完善