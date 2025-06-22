<template>
  <div class="task-detail">
    <button class="close-btn" @click="$emit('close')">×</button>
    <div v-if="task">
      <div class="detail-title">
        <span class="circle"></span>
        <span>{{ task.title }}</span>
      </div>
      <div class="detail-info">
        <div class="info-label">创建于：</div>
        <div class="info-value">{{ task.createdAt }}</div>
      </div>
      <div class="detail-info">
        <div class="info-label">详情：</div>
        <div class="info-value">{{ task.detail || '暂无详情' }}</div>
      </div>
    </div>
    <div v-else class="empty-detail">请选择左侧任务查看详情</div>
  </div>
</template>

<script setup>
const props = defineProps({
  task: Object
})
</script>

<style scoped>
.task-detail {
  width: 350px;
  background: #fff;
  height: 100vh;
  box-shadow: -2px 0 8px rgba(0,0,0,0.04);
  padding: 32px 24px 0 24px;
  display: flex;
  flex-direction: column;
  position: relative;
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
</style> 