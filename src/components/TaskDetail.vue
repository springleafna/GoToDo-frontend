<template>
  <transition name="slide-detail">
    <div class="task-detail">
      <button class="close-btn" @click="$emit('close')">×</button>
      <div v-if="props.task">
        <div class="detail-title">{{ props.task.title }}</div>
        <div class="detail-info"><span class="info-label">备注：</span><span class="info-value">{{ props.task.remark || '无' }}</span></div>
        <div class="detail-info"><span class="info-label">截止时间：</span><span class="info-value">{{ props.task.endTime || '无' }}</span></div>
        <div class="detail-info"><span class="info-label">提醒时间：</span><span class="info-value">{{ props.task.reminderTime || '无' }}</span></div>
        <div class="detail-info"><span class="info-label">优先级：</span><span class="info-value">{{ priorityText }}</span></div>
        <div class="detail-info"><span class="info-label">创建时间：</span><span class="info-value">{{ props.task.createTime }}</span></div>
      </div>
      <div v-else class="empty-detail">请选择左侧任务查看详情</div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed } from 'vue'
const props = defineProps({
  task: Object
})
const priorityText = computed(() => {
  if (!props.task) return '无'
  switch (props.task.priority) {
    case 0: return '低'
    case 1: return '中'
    case 2: return '高'
    default: return '无'
  }
})
</script>

<style scoped>
.task-detail {
  width: 300px;
  max-height: 100vh;
  box-shadow: -2px 0 8px rgba(0,0,0,0.04);
  padding: 32px 24px 0 24px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;
}
.close-btn {
  position: absolute;
  top: 16px;
  right: 18px;
  background: transparent;
  border: none;
  font-size: 1.6rem;
  color: #888;
  cursor: pointer;
  z-index: 2;
  transition: color 0.18s;
}
.close-btn:hover {
  color: #e74c3c;
}
.detail-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.circle {
  width: 24px;
  height: 24px;
  border: 2px solid #888;
  border-radius: 50%;
  display: inline-block;
}
.detail-info {
  display: flex;
  margin-bottom: 18px;
}
.info-label {
  color: #888;
  min-width: 60px;
}
.info-value {
  color: #222;
  margin-left: 8px;
}
.empty-detail {
  color: #888;
  font-size: 1.1rem;
  margin-top: 60px;
  text-align: center;
}
.slide-detail-enter-active, .slide-detail-leave-active {
  transition: all 0.35s cubic-bezier(.4,1.3,.6,1);
}
.slide-detail-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-detail-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>