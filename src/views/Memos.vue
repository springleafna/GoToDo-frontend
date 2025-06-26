<template>
  <div class="memos-main-content">
    <div class="memo-detail-wrapper">
      <div v-if="selectedMemo">
        <input
          v-model="selectedMemo.title"
          @blur="handleUpdateMemo()"
          class="memo-title"
        />
        <div class="memo-date">{{ selectedMemo.createdAt }}</div>
        <textarea
          v-model="selectedMemo.content"
          @blur="handleUpdateMemo()"
          class="memo-content"
          placeholder="输入内容"
        ></textarea>
      </div>
      <div v-else class="empty-detail">请选择右侧便签查看内容</div>
    </div>
    <div class="memo-list-wrapper">
      <div class="memo-list-title-row">
        <div class="memo-list-title">便签列表</div>
        <button class="add-memo-btn" @click="handleAddMemo">＋</button>
      </div>
      <div class="search-memo-bar">
        <input
          v-model="searchKeyword"
          @keyup.enter="handleSearchMemo"
          placeholder="搜索便签"
          class="search-memo-input"
        />
      </div>
      <div class="memo-list">
        <div
          v-for="memo in memos"
          :key="memo.memoId"
          class="memo-list-item"
          :class="{ selected: memo.memoId === selectedMemoId }"
          @click="selectMemo(memo.memoId)"
        >
          <div class="memo-list-title-row">
            <span class="memo-list-title-text">{{ memo.title }}</span>
            <span class="memo-list-date">{{ memo.createdAt }}</span>
            <button class="delete-memo-btn" @click.stop="deleteMemo(memo.memoId)">×</button>
          </div>
          <div class="memo-list-preview">{{ memo.content ? memo.content.slice(0, 24) : '' }}{{ memo.content && memo.content.length > 24 ? '...' : '' }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import {
  saveMemo,
  getMemoList,
  updateMemo,
  deleteMemo as apiDeleteMemo,
  getMemoDetail
} from '@/api/memo'

const memos = ref([])
const selectedMemoId = ref(null)
const selectedMemo = ref(null)
const newMemoTitle = ref('')
const searchKeyword = ref('')

// 防抖函数
const debounce = (fn, delay) => {
  let timer = null
  return (...args) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

// 获取便签列表
const fetchMemos = async () => {
  try {
    const res = await getMemoList()
    memos.value = res.data
  } catch (err) {
    console.error('获取便签列表失败:', err)
  }
}

fetchMemos()

function selectMemo(id) {
  selectedMemoId.value = id
  selectedMemo.value = memos.value.find(m => m.memoId === id)
}

async function handleAddMemo() {
  try {
    const res = await saveMemo()
    memos.value.unshift({ memoId: res, title: '', content: '' })
    selectedMemoId.value = res
    selectedMemo.value = memos.value[0]
  } catch (err) {
    console.error('创建便签失败:', err)
  }
}

async function handleDeleteMemo(id) {
  try {
    await apiDeleteMemo(id)
    const idx = memos.value.findIndex(m => m.memoId === id)
    if (idx !== -1) {
      memos.value.splice(idx, 1)
      if (selectedMemoId.value === id) {
        selectedMemoId.value = memos.value[0]?.memoId || null
      }
    }
  } catch (err) {
    console.error('删除便签失败:', err)
  }
}

// 存储原始内容用于比较
const originalMemo = ref(null)

watch(selectedMemo, (newVal) => {
  if (newVal) {
    originalMemo.value = JSON.parse(JSON.stringify(newVal))
  }
}, { immediate: true })

async function handleUpdateMemo() {
  if (selectedMemo.value && selectedMemo.value.memoId) {
    try {
      // 比较内容是否有变化
      if (JSON.stringify(selectedMemo.value) !== JSON.stringify(originalMemo.value)) {
        await updateMemo({
          memoId: selectedMemo.value.memoId,
          title: selectedMemo.value.title,
          content: selectedMemo.value.content
        })
        originalMemo.value = JSON.parse(JSON.stringify(selectedMemo.value))
      }
    } catch (err) {
      console.error('更新便签失败:', err)
    }
  } else if (selectedMemo.value && !selectedMemo.value.memoId) {
    console.warn('未找到 memoId，无法更新')
  }
}

// 监听 selectedMemo 变化，实现自动保存
watch(
  () => selectedMemo.value,
  debounce(async (newVal) => {
    if (newVal) {
      await handleUpdateMemo()
    }
  }, 2000),
  { deep: true }
)

// 预留搜索接口
function handleSearchMemo() {
  // 后续实现搜索逻辑
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
  color: #222; /* 深色标题 */
  border: none;
  outline: none;
}
.memo-date {
  color: #888;
  font-size: 0.98rem;
  margin-bottom: 24px;
}
.memo-content {
  font-size: 1.15rem;
  color: #666; /* 浅色内容 */
  line-height: 1.8;
  white-space: pre-wrap;
  border: none;
  outline: none;
  flex: 1;
  resize: none;
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
  margin-bottom: 18px;
  padding-left: 32px;
  padding-right: 16px;
}

.search-memo-bar {
  display: flex;
  align-items: center;
  padding: 0 16px 12px 16px;
  gap: 8px;
}

.search-memo-input {
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