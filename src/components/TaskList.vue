<template>
  <div class="task-list">
    <h2 class="list-title">任务列表</h2>
    <div class="task-items">
      <div
        v-for="task in tasks"
        :key="task.taskId"
        class="task-item"
        :class="{ selected: task.taskId === selectedTaskId, completed: task.completed === 1 }"
        @click="$emit('select-task', task.taskId)"
      >
        <input type="checkbox" :checked="task.completed === 1" @click.stop="handleToggleComplete(task)">
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
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { saveTask, completedTask } from '@/api/task'

const props = defineProps({
  selectedTaskId: Number,
  tasks: { type: Array, required: true }
})
const emit = defineEmits(['add-task', 'select-task', 'update-task'])
const route = useRoute()
const newTaskTitle = ref('')

async function handleAddTask() {
  const title = newTaskTitle.value.trim()
  if (!title) return
  try {
    const categoryId = Number(route.params.categoryId)
    await saveTask({
      title,
      categoryId
    })
    newTaskTitle.value = ''
    emit('task-added')
  } catch (err) {
    console.error('添加任务失败:', err)
  }
}

async function handleToggleComplete(task) {
  try {
    const newCompleted = task.completed === 1 ? 0 : 1
    await completedTask(task.taskId, newCompleted)
    emit('update-task', { ...task, completed: newCompleted })
  } catch (err) {
    console.error('更新任务状态失败:', err)
  }
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
  margin: 0 32px 0 0;
}
.task-item.selected {
  background: #e3eafd;
  border: 1.5px solid #6b8ce3;
}
.task-item:hover {
  background: #e9ebf5;
}
.task-title {
  flex: 1;
  color: #222;
}

.task-item.completed .task-title {
  text-decoration: line-through;
  color: #888;
}

.task-item input[type="checkbox"] {
  margin-right: 12px;
  width: 16px;
  height: 16px;
}
.add-task-bar {
  display: flex;
  align-items: center;
  background: #eceffd;
  border-radius: 8px;
  padding: 12px 18px;
  position: sticky;
  bottom: 16px;
  left: 16px;
  right: 16px;
  z-index: 2;
  margin: 0 32px 16px 0;
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