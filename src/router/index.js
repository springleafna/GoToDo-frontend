import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import MyDayView from '../views/MyDay.vue'
import ImportantView from '../views/Important.vue'
import TasksView from '../views/Tasks.vue'
import MemosView from '../views/Memos.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
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
  ],
})

export default router
