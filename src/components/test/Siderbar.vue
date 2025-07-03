<template>
  <div class="sidebar-container">
    <!-- 应用标题 -->
    <h1 class="app-title">GoToDo</h1>
    <div class="divider"></div>

    <!-- 导航菜单 -->
    <nav class="nav-menu">
      <a href="#" class="nav-item active">我的一天</a>
      <a href="#" class="nav-item">重要</a>
      <a href="#" class="nav-item">任务</a>
      <a href="#" class="nav-item">便签</a>
    </nav>
  </div>
</template>

<script setup>
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

.nav-item.active {
  background-color: #e6f7ff;
  color: #1890ff;
  border-left-color: #1890ff;
  font-weight: 500;
}
</style>