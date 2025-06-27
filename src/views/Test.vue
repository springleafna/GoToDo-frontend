<template>
  <div class="memo-app">
    <div class="memo-container">
      <div class="memo-header">
        <h1>我的便签</h1>
        <div class="memo-subheader">
          <span>{{ currentDate }} · 上次编辑 {{ lastEditTime }}</span>
          <div class="search-container">
            <input 
              type="text" 
              placeholder="搜索便签..." 
              class="search-input"
              v-model="searchQuery"
            >
          </div>
        </div>
      </div>

      <div class="memo-list">
        <div 
          v-for="memo in filteredMemos" 
          :key="memo.id" 
          class="memo-list-item"
          :class="{ selected: memo.id === selectedMemoId }" 
          @click="selectMemo(memo.id)"
        >
          <div class="memo-content">
            <div class="memo-title">{{ memo.title || '无标题' }}</div>
            <div class="memo-preview" v-if="memo.content">
              {{ memo.content.slice(0, 100) }}{{ memo.content.length > 100 ? '...' : '' }}
            </div>
          </div>
          <div class="memo-footer">
            <span class="memo-date">{{ formatDate(memo.createdAt) }} | {{ formatTime(memo.updatedAt) }}</span>
            <button class="delete-memo-btn" @click.stop="deleteMemo(memo.id)">×</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemoApp',
  data() {
    return {
      currentDate: new Date().toLocaleDateString('zh-CN'),
      lastEditTime: '15:30',
      selectedMemoId: 1,
      searchQuery: '',
      memos: [
        {
          id: 1,
          title: '周会记录',
          content: '1. 项目进度讨论\n2. 下周工作安排\n3. 问题反馈和解决方案...',
          createdAt: new Date('2025-06-27'),
          updatedAt: new Date('2025-06-27T15:30:00')
        },
        {
          id: 2,
          title: '产品需求分析',
          content: '用户痛点：1. 操作流程复杂\n2. 数据同步延迟\n3. 移动端适配...',
          createdAt: new Date('2025-06-27'),
          updatedAt: new Date('2025-06-27T14:20:00')
        },
        {
          id: 3,
          title: '',
          content: '开始记录...',
          createdAt: new Date('2025-06-26'),
          updatedAt: new Date('2025-06-26T18:45:00')
        },
        {
          id: 4,
          title: '购物清单',
          content: '1. 牛奶\n2. 鸡蛋\n3. 面包\n4. 水果',
          createdAt: new Date('2025-06-25'),
          updatedAt: new Date('2025-06-25T09:15:00')
        },
        {
          id: 5,
          title: '读书笔记',
          content: '《高效能人士的七个习惯》\n1. 积极主动\n2. 以终为始\n3. 要事第一...',
          createdAt: new Date('2025-06-24'),
          updatedAt: new Date('2025-06-24T20:10:00')
        }
      ]
    }
  },
  computed: {
    filteredMemos() {
      if (!this.searchQuery) return this.memos
      const query = this.searchQuery.toLowerCase()
      return this.memos.filter(memo => 
        (memo.title && memo.title.toLowerCase().includes(query)) ||
        (memo.content && memo.content.toLowerCase().includes(query))
      )
    }
  },
  methods: {
    selectMemo(id) {
      this.selectedMemoId = id
      // 这里可以添加加载完整备忘录内容的逻辑
    },
    deleteMemo(id) {
      this.memos = this.memos.filter(memo => memo.id !== id)
      if (this.selectedMemoId === id) {
        this.selectedMemoId = this.memos[0]?.id || null
      }
    },
    formatDate(date) {
      return date.toLocaleDateString('zh-CN')
    },
    formatTime(date) {
      return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    }
  }
}
</script>

<style scoped>
.memo-app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
  box-sizing: border-box;
}

.memo-container {
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  height: calc(100% - 40px);
}

.memo-header {
  margin-bottom: 24px;
}

.memo-header h1 {
  font-size: 24px;
  margin-bottom: 8px;
  color: #333;
  font-weight: 600;
}

.memo-subheader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  color: #666;
  font-size: 14px;
}

.search-container {
  flex: 1;
  max-width: 300px;
  margin-left: 20px;
}

.search-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #6b8ce3;
}

.memo-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: calc(100% - 100px);
  overflow-y: auto;
  padding-right: 8px;
}

.memo-list-item {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  border: 1px solid #eee;
}

.memo-list-item.selected {
  background: #f0f7ff;
  border-color: #6b8ce3;
}

.memo-list-item:hover {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.memo-title {
  font-weight: bold;
  color: #222;
  font-size: 16px;
  margin-bottom: 8px;
}

.memo-preview {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: pre-line;
}

.memo-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #888;
  font-size: 13px;
  border-top: 1px solid #eee;
  padding-top: 8px;
}

.delete-memo-btn {
  background: transparent;
  border: none;
  color: #c00;
  font-size: 20px;
  cursor: pointer;
  padding: 0 4px;
  border-radius: 3px;
  transition: background 0.18s;
  line-height: 1;
}

.delete-memo-btn:hover {
  background: #ffeaea;
}

/* 滚动条样式 */
.memo-list::-webkit-scrollbar {
  width: 6px;
}

.memo-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.memo-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.memo-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>