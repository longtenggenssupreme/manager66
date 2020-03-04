<template>
<el-container class="el-container">
    <el-header class="el-header">
        <el-row>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <img src="" style="line-height=60px" alt="无法显示图片"></div>
            </el-col>
            <el-col :span="18">
                <div class="grid-content bg-purple-light">
                    <h1 style="text-align: center">这是标题</h1>
                </div>
            </el-col>
            <el-col :span="2">
                <div class="grid-content bg-purple">
                    <a href="#" class="logout">退出</a>
                </div>
            </el-col>
        </el-row>
    </el-header>
    <el-container>
        <el-aside class="el-aside" width='200px'>
            <el-menu :router='true' default-active="1" class="el-menu-vertical-demo">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>用户管理</span>
                    </template>
                    <el-menu-item index="test">
                        <i class="el-icon-menu"></i>
                        <span>用户列表</span>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>导航一</span>
                    </template>
                    <el-menu-item index="test">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-main class="el-main">
            <router-view></router-view>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
export default {

}
</script>

<style>
.el-container {
    height: 100%;
}

.el-header {
    background-color: #B3C0D1;
    color: #333;
}

.el-aside {
    background-color: #D3DCE6;
}

.el-main {
    background-color: #e9eef3;
    height: 1000px;
}

.logout {
    line-height: 60px;
    text-decoration: none;
}
</style>
