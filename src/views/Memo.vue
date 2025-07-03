<template>
  <div class="memo-container">
    <memo-content class="memo-content" :memo="selectedMemo" :loading="loading" />
    <memo-list class="memo-list" @select-memo="handleSelectMemo" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getMemoDetail } from '@/api/memo';
import MemoContent from '@/components/test/MemoContent.vue';
import MemoList from '@/components/test/MemoList.vue';

const selectedMemo = ref(null);
const loading = ref(false);

const handleSelectMemo = async (memoId) => {
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
</script>

<style scoped>
.memo-container {
    display: flex;
    width: 100%;
    height: auto;
}
</style>