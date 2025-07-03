<template>
    <div class="memo-container">
        <memo-content class="memo-content" />
        <memo-list class="memo-list" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import MemoContent from '@/components/test/MemoContent.vue';
import MemoList from '@/components/test/MemoList.vue';

</script>

<style scoped>
.memo-container {
    display: flex;
    width: 100%;
    height: auto;
}

</style>