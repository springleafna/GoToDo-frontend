<template>
  <div class="memo-container">
    <memo-content ref="memoContentRef" class="memo-content" :memo="selectedMemo" :loading="loading" />
    <memo-list ref="memoListRef" class="memo-list" @select-memo="handleSelectMemo" @create-memo="handleCreateMemo" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getMemoDetail } from '@/api/memo';
import MemoContent from '@/components/MemoContent.vue';
import MemoList from '@/components/MemoList.vue';

const memoContentRef = ref(null);
const memoListRef = ref(null);
const selectedMemo = ref(null);
const loading = ref(false);

const handleSelectMemo = async (memoId) => {
  // 切换便签前保存当前内容
  if (memoContentRef.value) {
    await memoContentRef.value.saveOnLeave();
    // 刷新便签列表
    if (memoListRef.value) {
      memoListRef.value.refreshMemos();
    }
  }
  loading.value = true;
  try {
    const response = await getMemoDetail(memoId);
    selectedMemo.value = response.data;
  } catch (error) {
    console.error('获取便签详情失败:', error);
  } finally {
    loading.value = false;
  }
};

const handleCreateMemo = async () => {
  // 创建新便签前保存当前内容
  if (memoContentRef.value) {
    await memoContentRef.value.saveOnLeave();
    // 刷新便签列表
    if (memoListRef.value) {
      memoListRef.value.refreshMemos();
    }
  }
  selectedMemo.value = {};
};
</script>

<style scoped>
.memo-container {
    display: flex;
    width: 100%;
    height: auto;
}
</style>