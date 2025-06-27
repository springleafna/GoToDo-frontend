import { createRouter, createWebHistory } from 'vue-router'
import MyDayView from '../views/MyDay.vue'
import ImportantView from '../views/Important.vue'
import TasksView from '../views/Tasks.vue'
import MemosView from '../views/Memos.vue'
import TestView from '../views/Test.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MyDayView,
    },
    {
      path: '/my-day',
      name: 'my-day',
      component: MyDayView,
    },
    {
      path: '/important',
      name: 'important',
      component: ImportantView,
    },
    {
      path: '/tasks/:categoryId?',
      name: 'tasks',
      component: TasksView,
    },
    {
      path: '/memos',
      name: 'memos',
      component: MemosView,
    },
    {
      path: '/test',
      name: 'test',
      component: TestView
    }
  ],
})

export default router
