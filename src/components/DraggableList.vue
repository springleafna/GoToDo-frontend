<template>
  <div class="draggable-list">
    <div 
      v-for="(item, index) in items" 
      :key="item.id"
      class="list-item"
      draggable="true"
      @dragstart="handleDragStart($event, index)"
      @dragover.prevent="handleDragOver($event, index)"
      @dragenter.prevent="handleDragEnter($event, index)"
      @dragend="handleDragEnd"
      @drop="handleDrop($event, index)"
    >
      {{ item.text }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { id: 1, text: 'Item 1' },
  { id: 2, text: 'Item 2' },
  { id: 3, text: 'Item 3' },
  { id: 4, text: 'Item 4' }
])
const draggedIndex = ref(null)

const handleDragStart = (event, index) => {
  draggedIndex.value = index
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('text/html', event.target)
}

const handleDragEnter = (event) => {
  event.target.classList.add('drag-over')
}

const handleDragEnd = (event) => {
  event.target.classList.remove('drag-over')
}

const handleDragOver = (event) => {
  event.preventDefault()
  return false
}

const handleDrop = (event, index) => {
  event.preventDefault()
  event.target.classList.remove('drag-over')
  
  if (draggedIndex.value !== null && draggedIndex.value !== index) {
    const item = items.value.splice(draggedIndex.value, 1)[0]
    items.value.splice(index, 0, item)
    draggedIndex.value = null
  }
}
</script>

<style scoped>
.draggable-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.list-item {
  padding: 12px;
  background: #f5f5f5;
  border-radius: 4px;
  cursor: move;
  transition: all 0.2s ease;
}
.list-item:hover {
  background: #e0e0e0;
}
.list-item.drag-over {
  background: #e3f2fd;
  border: 1px dashed #2196f3;
}
</style>