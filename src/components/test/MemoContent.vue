<template>
  <div class="memo-container">
  <!-- 标题部分 -->
  <div class="header">
    <input 
      v-model="memo.title"
      placeholder="输入标题..."
      class="title-input"
    />
    <span class="timestamp">{{ memo.timestamp }}</span>
  </div>

  <!-- 内容部分 -->
  <div class="content">
    <textarea
      v-model="memo.content"
      placeholder="开始记录..."
      @input="updateCharacterCount"
    ></textarea>
  </div>

    <!-- 底部信息 -->
    <div class="footer">
      <span>字数：{{ characterCount }}</span>
      <span class="save-status">
        <i class="icon-check"></i>
        已保存
      </span>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'MemoContent',
  props: {
    memo: {
      type: Object,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const localMemo = ref({ title: '', content: '', timestamp: '' });

    watch(() => props.memo,
      (newVal) => {
        if (newVal) {
          localMemo.value = {
            title: newVal.title || '',
            content: newVal.content || '',
            timestamp: newVal.createTime ? new Date(newVal.createTime).toLocaleString('zh-CN', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            }) : ''
          };
        } else {
          localMemo.value = { title: '', content: '', timestamp: '' };
        }
      },
      { immediate: true }
    );

    // 计算字数
    const characterCount = ref(0);

    const updateCharacterCount = () => {
      characterCount.value = localMemo.value.content.length;
    };

    watch(() => localMemo.value.content,
      () => {
        updateCharacterCount();
      },
      { immediate: true }
    );

    return {
      memo: localMemo,
      characterCount,
      updateCharacterCount
    };
  }
};
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
  min-height: 650px;
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