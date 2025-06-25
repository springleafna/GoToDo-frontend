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
      <hr v-if="dynamicMenuItems.length" class="sidebar-divider" />
      <div
        v-for="(item, idx) in dynamicMenuItems"
        :key="item.itemType + '-' + item.itemRefId"
        class="menu-item"
        @click="selectDynamicMenuItem(item, idx)"
        :class="{ 'active': activeDynamicIndex === idx }"
      >
        {{ item.itemName }}
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
import { ref, onMounted } from 'vue'
import { listDisplayItems } from '@/api/displayItem'
import { createTaskCategory } from '@/api/category'
import { saveGroup } from '@/api/group'
import { useRouter } from 'vue-router'

const menuItems = ref([
  { id: 1, label: '我的一天' },
  { id: 2, label: '重要' },
  { id: 3, label: '任务' },
  { id: 4, label: '便签' },
])
const dynamicMenuItems = ref([])
const activeItem = ref(1)
const activeDynamicIndex = ref(null)
const router = useRouter()

const fetchDynamicMenu = async () => {
  try {
    const res = await listDisplayItems()
    if (res && res.code === 0 && Array.isArray(res.data)) {
      dynamicMenuItems.value = res.data.slice().sort((a, b) => a.sortOrder - b.sortOrder)
    }
  } catch (e) {
    // 错误已在api层处理
  }
}

const selectMenuItem = (item) => {
  activeItem.value = item.id
  activeDynamicIndex.value = null
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

const selectDynamicMenuItem = (item, idx) => {
  if (item.itemType === 'group') return
  activeItem.value = null
  activeDynamicIndex.value = idx
  if (item.itemType === 'category') {
    router.push({ name: 'tasks', params: { categoryId: item.itemRefId } })
  }
}

onMounted(fetchDynamicMenu)

async function onCreateList() {
  const name = window.prompt('请输入新建列表名称')
  if (!name || !name.trim()) return
  try {
    await createTaskCategory(name.trim())
    await fetchDynamicMenu()
  } catch (e) {}
}
async function onCreateGroup() {
  const name = window.prompt('请输入新建组名称')
  if (!name || !name.trim()) return
  try {
    await saveGroup(name.trim())
    await fetchDynamicMenu()
  } catch (e) {}
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

.sidebar-divider {
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 10px 0 10px 0;
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