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
        class="memo-item"
        @click="handleMemoClick(memo.memoId)"
      >
        <h3 class="memo-title">{{ memo.title || '无标题...' }}</h3>
        <p class="memo-content">{{ memo.content || '无内容...' }}</p>
        <span class="memo-timestamp">{{ formatDate(memo.createTime) }}</span>
      </div>
      <div v-if="filteredMemos.length === 0" class="empty-message">
        您还没有便签哦~请点击创建按钮进行添加
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, defineEmits } from 'vue';
import {
  getMemoList,
  getMemoDetail
} from '@/api/memo'

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

const handleMemoClick = (memoId) => {
  emit('select-memo', memoId);
};

onMounted(async () => {
  try {
    const response = await getMemoList();
    memos.value = response.data || [];
  } catch (error) {
    console.error('获取便签列表失败:', error);
    memos.value = [];
  }
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
}

/* 搜索框样式 */
.search-box {
  position: relative;
  margin-bottom: 30px;
  display: flex; /* 新增：使用flex布局 */
  gap: 10px; /* 新增：添加间距 */
  align-items: center; /* 新增：垂直居中对齐 */
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
}

.memo-item {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: transform 0.2s, box-shadow 0.2s;
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

.memo-timestamp {
  display: block;
  text-align: right;
  color: #999;
  font-size: 12px;
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