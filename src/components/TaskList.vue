<template>
  <div class="task-list">
    <h2 class="list-title">阅读计划</h2>
    <div class="task-items">
      <div
        v-for="task in tasks"
        :key="task.id"
        class="task-item"
        :class="{ selected: task.id === selectedTaskId }"
        @click="$emit('select-task', task.id)"
      >
        <span class="circle"></span>
        <span class="task-title">{{ task.title }}</span>
      </div>
    </div>
    <div class="add-task-bar">
      <span class="plus">＋</span>
      <input
        v-model="newTaskTitle"
        @keyup.enter="handleAddTask"
        placeholder="添加任务"
        class="add-input"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  tasks: Array,
  selectedTaskId: Number
})
const emit = defineEmits(['add-task', 'select-task'])
const newTaskTitle = ref('')
function handleAddTask() {
  if (!newTaskTitle.value.trim()) return
  emit('add-task', newTaskTitle.value)
  newTaskTitle.value = ''
}
</script>

<style scoped>
.task-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 100vw;
  min-width: 0;
  padding: 32px 0 0 32px;
  position: relative;
}
.list-title {
  color: #fff;
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 18px;
}
.task-items {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  margin-bottom: 16px;
}
.task-item {
  background: #f5f6fa;
  border-radius: 6px;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.18s;
  border: 1px solid transparent;
}
.task-item.selected {
  background: #e3eafd;
  border: 1.5px solid #6b8ce3;
}
.task-item:hover {
  background: #e9ebf5;
}
.circle {
  width: 24px;
  height: 24px;
  border: 2px solid #888;
  border-radius: 50%;
  margin-right: 16px;
  display: inline-block;
}
.task-title {
  flex: 1;
  color: #222;
}
.add-task-bar {
  display: flex;
  align-items: center;
  background: #eceffd;
  border-radius: 8px;
  padding: 12px 18px;
  margin-top: 0;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
}
.plus {
  font-size: 1.3rem;
  color: #888;
  margin-right: 10px;
}
.add-input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 1.1rem;
  flex: 1;
  color: #222;
}
</style> 