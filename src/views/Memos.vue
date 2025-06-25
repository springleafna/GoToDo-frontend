<template>
  <div class="memos-main-content">
    <div class="memo-detail-wrapper">
      <div v-if="selectedMemo">
        <div class="memo-title">{{ selectedMemo.title }}</div>
        <div class="memo-date">{{ selectedMemo.createdAt }}</div>
        <div class="memo-content">{{ selectedMemo.content }}</div>
      </div>
      <div v-else class="empty-detail">请选择右侧便签查看内容</div>
    </div>
    <div class="memo-list-wrapper">
      <div class="memo-list-title">便签列表</div>
      <div class="add-memo-bar">
        <input
          v-model="newMemoTitle"
          @keyup.enter="handleAddMemo"
          placeholder="输入标题并回车新建便签"
          class="add-memo-input"
        />
        <button class="add-memo-btn" @click="handleAddMemo">＋</button>
      </div>
      <div class="memo-list">
        <div
          v-for="memo in memos"
          :key="memo.id"
          class="memo-list-item"
          :class="{ selected: memo.id === selectedMemoId }"
          @click="selectMemo(memo.id)"
        >
          <div class="memo-list-title-row">
            <span class="memo-list-title-text">{{ memo.title }}</span>
            <span class="memo-list-date">{{ memo.createdAt }}</span>
            <button class="delete-memo-btn" @click.stop="deleteMemo(memo.id)">×</button>
          </div>
          <div class="memo-list-preview">{{ memo.content.slice(0, 24) }}{{ memo.content.length > 24 ? '...' : '' }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const memos = ref([
  { id: 1, title: '会议记录', content: '今天讨论了项目进度和下周计划。', createdAt: '2024-06-04' },
  { id: 2, title: '学习笔记', content: 'Vue3组合式API非常灵活，适合大型项目。', createdAt: '2024-06-03' },
  { id: 3, title: '灵感', content: '可以做一个极简风格的待办和便签应用。', createdAt: '2024-06-02' },
])
const selectedMemoId = ref(memos.value[0]?.id || null)
const selectedMemo = computed(() => memos.value.find(m => m.id === selectedMemoId.value))
const newMemoTitle = ref('')

function selectMemo(id) {
  selectedMemoId.value = id
}

function handleAddMemo() {
  const title = newMemoTitle.value.trim()
  if (!title) return
  const id = Date.now()
  const createdAt = new Date().toISOString().slice(0, 10)
  memos.value.unshift({ id, title, content: '', createdAt })
  selectedMemoId.value = id
  newMemoTitle.value = ''
}

function deleteMemo(id) {
  const idx = memos.value.findIndex(m => m.id === id)
  if (idx !== -1) {
    memos.value.splice(idx, 1)
    if (selectedMemoId.value === id) {
      selectedMemoId.value = memos.value[0]?.id || null
    }
  }
}
</script>

<style scoped>
.memos-main-content {
  display: flex;
  height: 100%;
  width: 100%;
  background: linear-gradient(180deg, #6b8ce3 0%, #7fa6e3 100%);
  overflow: hidden;
}
.memo-detail-wrapper {
  flex: 1 1 0;
  min-width: 0;
  max-width: 60%;
  background: #fff;
  padding: 48px 36px 0 48px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
  box-shadow: 2px 0 8px rgba(0,0,0,0.04);
}
.memo-title {
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 18px;
  color: #222;
}
.memo-date {
  color: #888;
  font-size: 0.98rem;
  margin-bottom: 24px;
}
.memo-content {
  font-size: 1.15rem;
  color: #333;
  line-height: 1.8;
  white-space: pre-wrap;
}
.empty-detail {
  color: #888;
  font-size: 1.1rem;
  margin-top: 60px;
  text-align: center;
}
.memo-list-wrapper {
  width: 340px;
  min-width: 260px;
  max-width: 400px;
  background: #f5f6fa;
  height: 100vh;
  box-shadow: -2px 0 8px rgba(0,0,0,0.04);
  display: flex;
  flex-direction: column;
  padding: 32px 0 0 0;
}
.memo-list-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #6b8ce3;
  margin-bottom: 18px;
  padding-left: 32px;
}
.add-memo-bar {
  display: flex;
  align-items: center;
  padding: 0 16px 12px 16px;
  gap: 8px;
}
.add-memo-input {
  flex: 1;
  border: none;
  background: #fff;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 1rem;
  color: #222;
  outline: none;
  box-shadow: 0 1px 2px rgba(0,0,0,0.03);
}
.add-memo-btn {
  background: #6b8ce3;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1.3rem;
  width: 36px;
  height: 36px;
  cursor: pointer;
  transition: background 0.18s;
}
.add-memo-btn:hover {
  background: #4e6edb;
}
.memo-list {
  flex: 1 1 auto;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 12px 24px 12px;
}
.memo-list-item {
  background: #fff;
  border-radius: 6px;
  padding: 14px 18px 10px 18px;
  cursor: pointer;
  border: 1.5px solid transparent;
  transition: background 0.18s, border 0.18s;
  margin-bottom: 2px;
  position: relative;
}
.memo-list-item.selected {
  background: #e3eafd;
  border: 1.5px solid #6b8ce3;
}
.memo-list-item:hover {
  background: #eceffd;
}
.memo-list-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  gap: 8px;
}
.memo-list-title-text {
  font-weight: bold;
  color: #222;
  font-size: 1.08rem;
}
.memo-list-date {
  color: #aaa;
  font-size: 0.95rem;
}
.delete-memo-btn {
  background: transparent;
  border: none;
  color: #c00;
  font-size: 1.2rem;
  cursor: pointer;
  margin-left: 8px;
  padding: 0 4px;
  border-radius: 3px;
  transition: background 0.18s;
}
.delete-memo-btn:hover {
  background: #ffeaea;
}
.memo-list-preview {
  color: #666;
  font-size: 0.98rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>