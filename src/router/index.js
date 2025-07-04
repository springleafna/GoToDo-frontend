import { createRouter, createWebHistory } from 'vue-router'
import MyDayView from '../views/MyDay.vue'
import ImportantView from '../views/Important.vue'
import TasksView from '../views/TasksView.vue'
import Memo from '@/views/Memo.vue'
import Tasks from '../views/Tasks.vue'

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
      path: '/tasks/:categoryId',
      name: 'tasks',
      component: TasksView,
    },
    {
      path: '/memo',
      name: 'memo',
      component: Memo
    },
    {
      path: '/task',
      name: 'task',
      component: Tasks
    }
  ],
})

export default router
