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
      <div v-for="menu in menuItems" :key="menu.itemRefId" class="main-menu">
        <span @click="toggleMenu(menu.itemRefId)" class="menu-toggle">
          {{ menu.itemName }}
          <img class="arrow-icon" :src="isMenuOpen[menu.itemRefId] ? iconUp : iconDown" alt="arrow">
        </span>
        <div class="sub-menu" v-show="isMenuOpen[menu.itemRefId]">
          <template v-if="menu.itemType === 'group' && menu.children && menu.children.length">
            <router-link
              v-for="child in menu.children"
              :key="child.categoryId"
              :to="`/category/${child.categoryId}`"
              class="nav-item"
            >
              {{ child.categoryName }}
            </router-link>
          </template>
          <template v-else-if="menu.itemType === 'category'">
            <router-link :to="`/category/${menu.itemRefId}`" class="nav-item">
              查看全部
            </router-link>
          </template>
        </div>
      </div>
    </nav>

    <!-- 新增按钮区域 -->
    <div class="sidebar-actions">
      <button class="action-button">+ 新建分类</button>
      <button class="action-button">+ 新建分组</button>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { listDisplayItems } from '@/api/displayItem';
import { listGroupCategory } from '@/api/group';
import iconUp from '@/assets/icons/icon-up.png';
import iconDown from '@/assets/icons/icon-down.png';

// 菜单数据和状态
const menuItems = ref([]);
const isMenuOpen = ref({});
const loading = ref(true);

// 切换菜单展开状态
const toggleMenu = (menuId) => {
  isMenuOpen.value[menuId] = !isMenuOpen.value[menuId];
};

// 获取菜单数据
const fetchMenuData = async () => {
  try {
    loading.value = true;
    // 获取一级菜单
    const displayItemsRes = await listDisplayItems();
    const displayItems = displayItemsRes.data || [];

    // 对一级菜单进行排序
    const sortedItems = displayItems.sort((a, b) => a.sortOrder - b.sortOrder);

    // 处理每个菜单项，获取二级菜单
    for (const item of sortedItems) {
      // 初始化菜单展开状态
      isMenuOpen.value[item.itemRefId] = false;

      // 如果是group类型，获取二级分类
      if (item.itemType === 'group') {
        try {
          const categoryRes = await listGroupCategory(item.itemRefId);
          console.log('ssss', categoryRes.data)
          item.children = categoryRes.data || [];
        } catch (err) {
          console.error(`获取组${item.itemRefId}的分类失败:`, err);
          message.error(`获取组${item.itemName}的分类失败`);
          item.children = [];
        }
      }
    }

    menuItems.value = sortedItems;
  } catch (err) {
    console.error('获取菜单数据失败:', err);
    message.error('获取菜单数据失败');
  } finally {
    loading.value = false;
  }
};

// 组件挂载时获取数据
onMounted(() => {
  fetchMenuData();
});
</script>

<style scoped>
.sidebar-container {
  width: 240px;
  background-color: #f9f9f9;
  border-right: 1px solid #f0f0f0;
  padding: 20px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100vh;
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

/* 新增按钮样式 */
.sidebar-actions {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: auto;
}

.action-button {
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 0;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.2s;
}

.action-button:hover {
  background-color: #096dd9;
}
</style>