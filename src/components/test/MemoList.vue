<template>
  <div class="memo-list-container">
    <!-- 搜索框 -->
    <div class="search-box">
      <input
        v-model="searchKeyword"
        placeholder="搜索便签..."
        class="search-input"
      />
      <button class="create-btn" @click="handleCreateMemo">+</button>
    </div>

    <!-- 便签列表 -->
    <div class="memo-items">
      <div
        v-for="memo in filteredMemos"
        :key="memo.memoId"
        class="memo-item" :class="{ 'pinned-memo': memo.pinned === 1 }"
        @click="handleMemoClick(memo.memoId)"
      >
        <h3 class="memo-title">{{ memo.title || '无标题...' }}</h3>
        <p class="memo-content">{{ memo.content || '无内容...' }}</p>
        <div class="memo-meta">
          <span class="memo-timestamp">{{ formatDate(memo.updateTime) }}</span>
          <button 
            class="menu-btn"
            @click.stop="toggleMenu(memo.memoId)"
            :class="{ active: showMenuId === memo.memoId }"
          >
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </button>
          <div 
            class="memo-menu"
            v-if="showMenuId === memo.memoId"
            @click.stop
          >
            <div @click="handleDelete(memo.memoId)">删除</div>
            <div @click="handlePin(memo.memoId)">{{ memo.pinned === 1 ? '取消置顶' : '置顶' }}</div>
          </div>
        </div>
      </div>
      <div v-if="filteredMemos.length === 0" class="empty-message">
        您还没有便签哦~请点击创建按钮进行添加
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, defineEmits } from 'vue';
import { getMemoList, deleteMemo, updateMemo, updatePinnedMemo } from '@/api/memo'

// 新增：定义创建便签事件
const emit = defineEmits(['select-memo', 'create-memo']);

// 新增：创建便签按钮点击事件
const handleCreateMemo = () => {
  emit('create-memo');
};

// 格式化时间
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).replace(/\//g, '-');
}

// 便签数据
const memos = ref([]);
const showMenuId = ref(null);

const handleMemoClick = (memoId) => {
  emit('select-memo', memoId);
};

const toggleMenu = (memoId) => {
  if (showMenuId.value === memoId) {
    showMenuId.value = null;
  } else {
    showMenuId.value = memoId;
  }
};

const handleDelete = async (memoId) => {
  if (confirm('确定要删除这个便签吗？')) {
    try {
      await deleteMemo(memoId);
      showMenuId.value = null;
      loadMemos();
    } catch (error) {
      console.error('删除便签失败:', error);
    }
  }
};

const handlePin = async (memoId) => {
  try {
    const memo = memos.value.find(m => m.memoId === memoId);
    const currentPinned = memo.pinned === 1;
    await updatePinnedMemo({
      memoId,
      pinned: !currentPinned
    });
    showMenuId.value = null;
    loadMemos();
  } catch (error) {
    console.error(currentPinned ? '取消置顶便签失败:' : '置顶便签失败:', error);
  }
};

const loadMemos = async () => {
  try {
    const response = await getMemoList();
    // 按置顶状态和更新时间排序
    memos.value = (response.data || []).sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.updateTime) - new Date(a.updateTime);
    });
  } catch (error) {
    console.error('获取便签列表失败:', error);
    memos.value = [];
  }
};

onMounted(loadMemos);

const refreshMemos = () => {
  loadMemos();
};

defineExpose({
  refreshMemos
});

// 搜索关键词
const searchKeyword = ref('');

// 过滤便签列表
const filteredMemos = computed(() => {
  if (!searchKeyword.value) return memos.value;
  const keyword = searchKeyword.value.toLowerCase();
  return memos.value.filter(memo => 
    memo.title.toLowerCase().includes(keyword) || 
    memo.content.toLowerCase().includes(keyword)
  );
});
</script>

<style scoped>
.memo-list-container {
  width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

/* 搜索框样式 */
.search-box {
  position: relative;
  margin-bottom: 30px;
  display: flex;
  gap: 10px;
  align-items: center;
  flex-shrink: 0;
}

/* 新增：创建按钮样式 */
.create-btn {
  background-color: #007bff;
  width: 50px;
  height: 40px;
  border-radius: 8px;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.create-btn:hover {
  background-color: #0056b3;
}

.search-input {
  width: 100%;
  padding: 12px 15px;
  padding-left: 40px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

/* 便签列表样式 */
.memo-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex-grow: 1;
  overflow-y: auto;
  padding-right: 5px;
}

.memo-item {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
}

.memo-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.memo-title {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 18px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.memo-content {
  margin: 0 0 15px 0;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.memo-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.menu-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  gap: 3px;
  align-items: center;
  padding: 5px;
  border-radius: 4px;
}

.menu-btn:hover {
  background-color: #f0f0f0;
}

.dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #999;
}

.memo-timestamp {
  display: block;
  color: #999;
  font-size: 12px;
}

.memo-menu {
  position: absolute;
  right: 0;
  bottom: 25px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  min-width: 100px;
  z-index: 10;
}

.memo-menu div {
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
}

.memo-menu div:hover {
  background-color: #f0f0f0;
}

.pinned-memo {
  background-color: #fff8e6;
  border-left: 3px solid #ffc107;
}

.pinned-memo .memo-title {
  font-weight: 500;
}

.memo-menu div:first-child {
  color: #ff4d4f;
}

.empty-message {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
</style>