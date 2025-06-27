<template>
  <div class="memos-main-content">
    <div class="memo-detail-wrapper">
      <div v-if="selectedMemo">
        <input v-model="selectedMemo.title" @blur="handleUpdateMemo()" class="memo-title" placeholder="输入标题" />
        <div class="memo-date">{{ selectedMemo.createdAt }}</div>
        <textarea v-model="selectedMemo.content" @blur="handleUpdateMemo()" class="memo-content"
          placeholder="输入内容"></textarea>
      </div>
      <div v-else class="empty-detail">请选择右侧便签查看内容</div>
    </div>
    <div class="memo-list-wrapper">
      <div class="memo-list-title-head">
        <div class="memo-list-title">便签列表</div>
        <button class="add-memo-btn" @click="handleAddMemo">＋</button>
      </div>
      <div class="search-memo-bar">
        <input v-model="searchKeyword" @keyup.enter="handleSearchMemo" placeholder="搜索便签" class="search-memo-input" />
      </div>
      <div class="memo-list">
        <div v-for="memo in memos" :key="memo.memoId" class="memo-list-item"
          :class="{ selected: memo.memoId === selectedMemoId }" @click="selectMemo(memo.memoId)">
          <div class="memo-list-title-row">
            <template v-if="memo.title.trim()">
              <span class="memo-list-title-text">{{ memo.title }}</span>
            </template>
            <template v-else>
              <span class="memo-list-preview-text">{{ memo.content ? memo.content.slice(0, 24) : '' }}{{ memo.content &&
                memo.content.length > 24 ? '...' : '' }}</span>
            </template>
          </div>
          <div class="memo-list-date-row">
            <span class="memo-list-date">{{ formatDate(memo.createTime) }}</span>
            <button class="delete-memo-btn" @click.stop="deleteMemo(memo.memoId)">×</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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
    const newMemo = { title: '', content: '', createTime: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z') };
    const res = await saveMemo(newMemo);
    const createdMemo = { ...newMemo, memoId: res };
    memos.value.unshift(createdMemo);
    selectedMemoId.value = res;
    selectedMemo.value = createdMemo;
  } catch (err) {
    console.error('创建便签失败:', err);
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
  position: relative;
  background: linear-gradient(180deg, #6b8ce3 0%, #7fa6e3 100%);
  overflow: hidden;
  padding-right: 0;
}

.memo-detail-wrapper {
  flex: 1;
  min-width: 0;
  margin: 0 auto;
  padding: 60px;
  max-width: 1200px;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
  backdrop-filter: blur(12px);
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.10);

  @media (min-width: 769px) {
    margin-right: 340px;
  }
}

.memo-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0 auto 24px;
  padding: 16px 20px;
  color: #222;
  border: none;
  outline: none;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(31, 38, 135, 0.04);
  transition: box-shadow 0.2s;
  width: 100%;
  max-width: 800px;
}

.memo-title:focus {
  box-shadow: 0 4px 16px rgba(31, 38, 135, 0.10);
}

.memo-date {
  color: #888;
  font-size: 0.98rem;
  margin-bottom: 24px;
}

.memo-content {
  font-size: 1.25rem;
  color: #444;
  line-height: 1.4;
  white-space: pre-wrap;
  border: none;
  outline: none;
  flex: 1;
  resize: none;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  padding: 24px;
  margin: 8px auto 0;
  box-shadow: 0 2px 8px rgba(31, 38, 135, 0.04);
  transition: box-shadow 0.2s;
  width: 100%;
  max-width: 800px;
  height: 70vh;
}

.memo-content:focus {
  box-shadow: 0 4px 16px rgba(31, 38, 135, 0.10);
}

.memo-date {
  color: #888;
  font-size: 0.98rem;
  margin-bottom: 24px;
  margin-left: 4px;
}

.empty-detail {
  color: #888;
  font-size: 1.1rem;
  margin: 60px auto 0;
  text-align: center;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(31, 38, 135, 0.04);
  max-width: 800px;
  width: 90%;
}

.memo-list-wrapper {
  position: absolute;
  right: 0;
  top: 0;
  width: 340px;
  box-sizing: border-box;
  padding-right: 0;
  min-width: 260px;
  max-width: none;
  margin-left: auto;
  margin-right: 0;
  margin-left: auto;
  margin-right: 0;
  background: #f5f6fa;
  height: 100vh;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  padding: 32px 0 0 0;

  @media (max-width: 768px) {
    width: 100%;
    position: relative;
    height: auto;
    box-shadow: none;
    margin-top: 20px;
  }
}
.memo-list-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #6b8ce3;
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
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
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

.memo-list-title-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
  padding-right: 16px;
  padding-left: 18px;
}

.memo-list-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
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
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}

.memo-list-title-text {
  font-weight: bold;
  color: #222;
  font-size: 1.08rem;
}

.memo-list-date {
  color: #888;
  font-size: 0.85rem;
}

.memo-list-date-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
  padding-right: 12px;
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