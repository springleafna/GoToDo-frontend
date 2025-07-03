<template>
  <div class="sidebar-container">
    <!-- 应用标题 -->
    <h1 class="app-title">GoToDo</h1>
    <div class="divider"></div>

    <!-- 导航菜单 -->
    <nav class="nav-menu">
      <router-link to="/my-day" class="nav-item" active-class="active">我的一天</router-link>
      <router-link to="/important" class="nav-item" active-class="active">重要</router-link>
      <router-link to="/task" class="nav-item" active-class="active">任务</router-link>
      <router-link to="/memo" class="nav-item" active-class="active">便签</router-link>
    </nav>
    <hr>
    <nav class="two-level-nav">
      <div class="main-menu">
        <span @click="toggleMenu('project')" class="menu-toggle">
          项目管理
          <img class="arrow-icon" :src="isProjectOpen ? iconDown : iconUp" alt="arrow">
        </span>
        <div class="sub-menu" v-show="isProjectOpen">
          <router-link to="/projects/create" class="nav-item">创建项目</router-link>
          <router-link to="/projects/list" class="nav-item">项目列表</router-link>
        </div>
      </div>
      <div class="main-menu">
        <span @click="toggleMenu('team')" class="menu-toggle">
          团队协作
          <img class="arrow-icon" :src="isTeamOpen ? iconDown : iconUp" alt="arrow">
        </span>
        <div class="sub-menu" v-show="isTeamOpen">
          <router-link to="/team/members" class="nav-item">成员管理</router-link>
          <router-link to="/team/tasks" class="nav-item">任务分配</router-link>
        </div>
      </div>
    </nav>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import iconUp from '@/assets/icons/icon-up.png';
import iconDown from '@/assets/icons/icon-down.png';
// 控制下拉菜单展开状态
const isProjectOpen = ref(false);
const isTeamOpen = ref(false);

// 切换菜单展开状态
const toggleMenu = (menu) => {
  if (menu === 'project') {
    isProjectOpen.value = !isProjectOpen.value;
  } else if (menu === 'team') {
    isTeamOpen.value = !isTeamOpen.value;
  }
};
// 侧边栏组件逻辑
</script>

<style scoped>
.sidebar-container {
  width: 240px;
  background-color: #f9f9f9;
  border-right: 1px solid #f0f0f0;
  padding: 20px 0;
  box-sizing: border-box;
}

/* 应用标题 */
.app-title {
  font-size: 20px;
  color: #333333;
  text-align: center;
  margin: 0 0 20px 0;
  padding: 0 20px;
  font-weight: 600;
}

/* 分隔线 */
.divider {
  height: 1px;
  background-color: #f0f0f0;
  margin: 10px 0;
}

/* 导航菜单 */
.nav-menu {
  padding: 10px 0;
}

.nav-item {
  display: block;
  padding: 12px 24px;
  color: #666666;
  text-decoration: none;
  font-size: 16px;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.nav-item:hover {
  background-color: #f5f5f5;
}

/* 两级菜单样式 */
.two-level-nav {
  padding: 10px 0;
}

.main-menu {
  margin-bottom: 8px;
}

.menu-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 16px;
  color: #666666;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.menu-toggle:hover {
  background-color: #f5f5f5;
}

.arrow-icon {
  width: 10px;
  vertical-align: middle;
  transition: transform 0.2s ease;
}

.sub-menu {
  background-color: #f9f9f9;
  border-left: 3px solid transparent;
  margin-left: 0;
  padding-left: 0;
  box-shadow: none;
  transition: all 0.2s ease;
}

.sub-menu .nav-item {
  padding-left: 24px;
  font-size: 16px;
}

.sub-menu .nav-item:hover {
  border-left-color: #42b983;
}

.nav-item.active {
  color: #42b983;
  border-left-color: #42b983;
  font-weight: 500;
}

.nav-item.active {
  background-color: #e6f7ff;
  color: #1890ff;
  border-left-color: #1890ff;
  font-weight: 500;
}
</style>