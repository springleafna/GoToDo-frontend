<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <h3>菜单</h3>
    </div>
    <div class="sidebar-menu">
      <div 
        v-for="item in menuItems" 
        :key="item.id"
        class="menu-item"
        @click="selectMenuItem(item)"
        :class="{ 'active': activeItem === item.id }"
      >
        {{ item.label }}
      </div>
    </div>
    <div class="sidebar-bottom">
      <button class="sidebar-btn" @click="onCreateList">
        <span class="plus">＋</span>
        <span class="btn-text">新建列表</span>
      </button>
      <button class="sidebar-btn" @click="onCreateGroup">
        <span class="plus">＋</span>
        <span class="btn-text">创建新组</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const menuItems = ref([
  { id: 1, label: '我的一天' },
  { id: 2, label: '重要' },
  { id: 3, label: '任务' },
  { id: 4, label: '便签' },
])

const activeItem = ref(1)

import { useRouter } from 'vue-router'

const router = useRouter()

const selectMenuItem = (item) => {
  activeItem.value = item.id
  
  // 根据菜单项跳转到对应路由
  switch(item.id) {
    case 1:
      router.push({ name: 'my-day' })
      break
    case 2:
      router.push({ name: 'important' })
      break
    case 3:
      router.push({ name: 'tasks' })
      break
    case 4:
      router.push({ name: 'memos' })
      break
  }
}

// 新建列表和新建组的点击事件（暂时只弹窗提示）
function onCreateList() {
  alert('新建列表功能待实现')
}
function onCreateGroup() {
  alert('创建新组功能待实现')
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background: #f8f9fa;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
}

.sidebar-header {
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
}

.sidebar-menu {
  flex: 1 1 auto;
}

.menu-item {
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.menu-item:hover {
  background: #e9ecef;
}

.menu-item.active {
  background: #e3f2fd;
  color: #1976d2;
}

.sidebar-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0 10px 0;
  border-top: 1px solid #e0e0e0;
  background: #f8f9fa;
  gap: 0;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}
.sidebar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  font-size: 1.08rem;
  color: #222;
  cursor: pointer;
  padding: 0 18px;
  border-radius: 6px;
  transition: background 0.18s;
  height: 40px;
  min-width: 90px;
  white-space: nowrap;
}
.sidebar-btn:hover {
  background: #ececec;
}
.plus {
  font-size: 1.3rem;
  margin-right: 4px;
  font-weight: 400;
  line-height: 1;
}
.btn-text {
  white-space: nowrap;
}
</style>