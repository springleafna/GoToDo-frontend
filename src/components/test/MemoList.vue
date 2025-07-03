<template>
  <div class="memo-list-container">
    <!-- 搜索框 -->
    <div class="search-box">
      <input
        v-model="searchKeyword"
        placeholder="搜索便签..."
        class="search-input"
      />
      <i class="search-icon"></i>
    </div>

    <!-- 便签列表 -->
    <div class="memo-items">
      <div
        v-for="memo in filteredMemos"
        :key="memo.id"
        class="memo-item"
      >
        <h3 class="memo-title">{{ memo.title }}</h3>
        <p class="memo-content">{{ memo.content }}</p>
        <span class="memo-timestamp">{{ memo.timestamp }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// 模拟便签数据
const memos = ref([
  {
    id: 1,
    title: '# 产品需求分析',
    content: '整理本季度产品迭代计划，包括核心功能优化...',
    timestamp: '2025-06-27 | 14:20'
  },
  {
    id: 2,
    title: '# 周会记录',
    content: '1. 上周工作进展回顾 2. 本周重点任务...',
    timestamp: '2025-06-27 | 15:30'
  },
  {
    id: 3,
    title: '# 临时灵感',
    content: '新功能构思：可以考虑添加协作编辑功能...',
    timestamp: '2025-06-27 | 16:45'
  }
]);

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
  max-width: 800px;
  min-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
}

/* 搜索框样式 */
.search-box {
  position: relative;
  margin-bottom: 30px;
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
}

.memo-content {
  margin: 0 0 15px 0;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.memo-timestamp {
  display: block;
  text-align: right;
  color: #999;
  font-size: 12px;
}
</style>