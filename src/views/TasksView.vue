<template>
  <div class="tasks-main-content">
    <div
      class="task-list-wrapper"
      :class="{ 'shrink': selectedTaskId }"
    >
      <TaskList
        :tasks="tasks"
        :selectedTaskId="selectedTaskId"
        @add-task="addTask"
        @select-task="selectTask"
        @update-task="handleUpdateTask"
        @task-added="fetchTasks"
      />
    </div>
    <transition name="slide-detail">
      <div v-if="selectedTaskId" class="task-detail-wrapper">
        <TaskDetail :task="selectedTask" @close="closeDetail" />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { listTaskByCategoryId } from '@/api/task'
import { useRoute } from 'vue-router'
import TaskList from '../components/TaskList.vue'
import TaskDetail from '../components/TaskDetail.vue'

const tasks = ref([])
const selectedTaskId = ref(null)
const route = useRoute()

watch(
  () => route.params.categoryId,
  () => fetchTasks(),
  { immediate: true }
)

const selectedTask = computed(() => tasks.value.find(t => t.taskId === selectedTaskId.value))

function addTask(title) {
  if (!title.trim()) return
  const id = Date.now()
  tasks.value.push({ id, title, detail: '', createdAt: new Date().toISOString().slice(0, 10) })
  selectedTaskId.value = id
}
function selectTask(id) {
  selectedTaskId.value = id
}
function closeDetail() {
  selectedTaskId.value = null
}

function handleUpdateTask(updatedTask) {
  const index = tasks.value.findIndex(t => t.taskId === updatedTask.taskId)
  if (index !== -1) {
    tasks.value.splice(index, 1, updatedTask)
  }
}

async function fetchTasks() {
  if (route.params.categoryId) {
    const res = await listTaskByCategoryId(route.params.categoryId)
    tasks.value = res.data || []
  }
}
</script>

<style scoped>
.tasks-main-content {
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background: linear-gradient(180deg, #6b8ce3 0%, #7fa6e3 100%);
}
.task-list-wrapper {
  flex: 1 1 0;
  min-width: 0;
  max-width: 100%;
  transition: max-width 0.35s cubic-bezier(.4,1.3,.6,1), flex-basis 0.35s cubic-bezier(.4,1.3,.6,1);
  height: 100%;
  overflow: hidden;
}
.task-list-wrapper.shrink {
  max-width: 70%;
  flex: 0 0 70%;
}
.task-detail-wrapper {
  width: 30%;
  min-width: 340px;
  max-width: 480px;
  height: 100%;
  background: #fff;
  box-shadow: -2px 0 8px rgba(0,0,0,0.04);
  z-index: 10;
  overflow: hidden;
  position: relative;
}
.slide-detail-enter-active, .slide-detail-leave-active {
  transition: transform 0.35s cubic-bezier(.4,1.3,.6,1), opacity 0.25s;
}
.slide-detail-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-detail-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-detail-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-detail-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>