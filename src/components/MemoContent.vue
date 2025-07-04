<template>
  <div class="memo-container">
  <!-- 标题部分 -->
  <div class="header">
    <input 
      v-model="localMemo.title"
      placeholder="输入标题..."
      class="title-input"
    />
    <span class="timestamp">{{ formatDate(localMemo.updateTime)  }}</span>
  </div>

  <!-- 内容部分 -->
  <div class="content">
    <textarea
      v-model="localMemo.content"
      placeholder="开始记录..."
      @input="updateCharacterCount"
    ></textarea>
  </div>

    <!-- 底部信息 -->
    <div class="footer">
      <span>字数：{{ charCount }}</span>
      <span class="save-status">
        <i class="icon-check"></i>
        已保存
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from 'vue';
import { addMemo, updateMemo } from '@/api/memo';

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: '2-digit',
  }).replace(/\//g, '-');
}

const props = defineProps({
  memo: {
    type: Object,
    default: () => ({})
  },
  loading: {
    type: Boolean,
    default: false
  }
});

// 存储原始memo数据用于比较
const originalMemo = ref({ ...props.memo });
const localMemo = ref({ ...props.memo });
const charCount = ref(0);

watch(() => props.memo,
  (newVal) => {
    originalMemo.value = { ...newVal };
    localMemo.value = { ...newVal };
    updateCharCount();
  },
  { deep: true }
);

watch(() => localMemo.value.content,
  () => {
    updateCharCount();
  }
);

const updateCharCount = () => {
  charCount.value = localMemo.value.content ? localMemo.value.content.length : 0;
};

// 页面离开时保存/更新便签
const saveOnLeave = async () => {
  // 检查memoId是否存在
  if (localMemo.value.memoId) {
    // 存在memoId - 更新场景：检查标题或内容是否有变化
    const titleChanged = localMemo.value.title !== originalMemo.value.title;
    const contentChanged = localMemo.value.content !== originalMemo.value.content;

    if (titleChanged || contentChanged) {
      try {
        console.log('执行更新')
        await updateMemo({
          memoId: localMemo.value.memoId,
          title: localMemo.value.title,
          content: localMemo.value.content
        });
        console.log('便签已更新');
      } catch (error) {
        console.error('更新便签失败:', error);
      }
    }
  } else {
    // 不存在memoId - 新增场景：检查标题和内容是否都为空
    const titleEmpty = !localMemo.value.title?.trim();
    const contentEmpty = !localMemo.value.content?.trim();

    if (!titleEmpty || !contentEmpty) {
      try {
        await addMemo({
          title: localMemo.value.title || '',
          content: localMemo.value.content || ''
        });
        console.log('新便签已保存');
      } catch (error) {
        console.error('保存新便签失败:', error);
      }
    }
  }
};

// 组件卸载时保存
onBeforeUnmount(saveOnLeave);

// 页面关闭/刷新时保存
const handleBeforeUnload = async (e) => {
  await saveOnLeave();
  e.returnValue = '您有未保存的更改，确定要离开吗？';
};

window.addEventListener('beforeunload', handleBeforeUnload);

// 组件卸载时移除事件监听
onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload);
});

defineExpose({
  saveOnLeave
});
</script>

<style scoped>
/* 全局样式 */
.memo-container {
  font-family: Arial, sans-serif;
  background-color: #fff;
  padding: 20px;
  flex-direction: column;
  min-height: 100vh;
}

.loading,
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  color: #666;
  font-size: 16px;
}

/* 标题部分 */
.header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
}

.title-input {
  width: 100%;
  font-size: 24px;
  color: #333;
  border: none;
  background: transparent;
  padding: 10px 0;
  margin-bottom: 15px;
  outline: none;
  font-weight: bold;
}

.title-input::placeholder {
  color: #999;
}

.timestamp {
  color: #999;
  font-size: 14px;
}

/* 内容部分 */
.content textarea {
  width: 100%;
  min-height: 700px;
  padding: 0;
  font-size: 18px;
  color: #333;
  font-family: Arial, sans-serif;
  border: none;
  resize: vertical;
  outline: none;
  line-height: 1.6;
  margin-top: 10px;
}

/* 底部信息 */
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  font-size: 14px;
  color: #666;
}

.save-status {
  display: flex;
  align-items: center;
}

.icon-check {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 5px;
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green"><path d="M20.285 2.285a.75.75 0 011.06 1.06l-8.5 8.5a.75.75 0 01-1.06 0l-4.25-4.25a.75.75 0 011.06-1.06L12 10.439l7.215-7.215z"/></svg>');
  background-size: cover;
}
</style>