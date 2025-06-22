<template>
  <div class="memos-view">
    <h2 class="title">便签</h2>
    <div class="add-bar">
      <input type="text" v-model="newMemoContent" placeholder="输入新便签内容..." @keyup.enter="addMemo" />
      <button @click="addMemo">添加</button>
    </div>
    <div class="search-bar">
      <input type="text" v-model="search" placeholder="搜索..." />
      <span class="search-icon">🔍</span>
    </div>
    <div class="memos-list">
      <div class="memo-card" v-for="memo in filteredMemos" :key="memo.id">
        <div class="memo-date">{{ memo.date }}</div>
        <button class="delete-btn" @click="deleteMemo(memo.id)">×</button>
        <div class="memo-title">{{ memo.title }}</div>
        <div class="memo-content" v-if="memo.content">{{ memo.content }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const search = ref('')
const newMemoContent = ref('')
const memos = ref([])

// 本地存储key
const STORAGE_KEY = 'memos-list'

// 加载本地数据
onMounted(() => {
  const local = localStorage.getItem(STORAGE_KEY)
  if (local) {
    memos.value = JSON.parse(local)
  } else {
    // 初始数据
    memos.value = [
      { id: 1, date: '5月25日', title: '250525', content: '• LeetCode-SQL50题-查询' },
      { id: 2, date: '5月6日', title: '250506', content: '• 准备面试-Mysql' },
      { id: 3, date: '5月1日', title: '250430', content: '• 知汇项目-长期任务crud\n总结：又是摆烂了几天。。。' },
      { id: 4, date: '4月29日', title: '250429', content: '• 知汇项目-每日计划crud和前端' },
      { id: 5, date: '4月29日', title: '250428', content: '• 复习AQS\n• 复习Java中的各种锁' },
    ]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memos.value))
  }
})

// 监听memos变化，自动保存
watch(memos, (val) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
}, { deep: true })

// 新增便签
function addMemo() {
  const content = newMemoContent.value.trim()
  if (!content) return
  const now = new Date()
  const month = now.getMonth() + 1
  const day = now.getDate()
  const dateStr = `${month}月${day}日`
  const id = Date.now()
  memos.value.unshift({
    id,
    date: dateStr,
    title: id.toString().slice(-6),
    content
  })
  newMemoContent.value = ''
}

// 删除便签
function deleteMemo(id) {
  memos.value = memos.value.filter(m => m.id !== id)
}

const filteredMemos = computed(() => {
  if (!search.value) return memos.value
  return memos.value.filter(memo =>
    memo.title.includes(search.value) ||
    memo.content.includes(search.value) ||
    memo.date.includes(search.value)
  )
})
</script>

<style scoped>
.memos-view {
  padding: 20px;
  max-width: 420px;
  margin: 0 auto;
  background: #fff;
  min-height: 100vh;
}
.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 16px;
}
.add-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
}
.add-bar input {
  flex: 1;
  padding: 6px 10px;
  border: 1px solid #d0e6d0;
  border-radius: 6px;
  font-size: 1rem;
}
.add-bar button {
  padding: 6px 16px;
  background: #7ed97e;
  border: none;
  border-radius: 6px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}
.add-bar button:hover {
  background: #5ec95e;
}
.search-bar {
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 8px;
  padding: 6px 12px;
  margin-bottom: 18px;
}
.search-bar input {
  border: none;
  background: transparent;
  outline: none;
  flex: 1;
  font-size: 1rem;
  padding: 4px 0;
}
.search-icon {
  font-size: 1.1rem;
  color: #888;
}
.memos-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.memo-card {
  background: #e6f7e6;
  border-radius: 10px;
  padding: 14px 16px 12px 16px;
  position: relative;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  min-height: 60px;
}
.memo-date {
  position: absolute;
  top: 10px;
  right: 36px;
  font-size: 0.95rem;
  color: #7a9c7a;
}
.delete-btn {
  position: absolute;
  top: 6px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  color: #b94a48;
  cursor: pointer;
  padding: 0 4px;
  line-height: 1;
}
.delete-btn:hover {
  color: #e74c3c;
}
.memo-title {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 6px;
}
.memo-content {
  color: #333;
  white-space: pre-line;
  font-size: 1rem;
}
</style>