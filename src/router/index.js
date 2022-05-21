import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home.vue'
import WeekDays from '../views/week-days.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/weekdays',
    name: 'week-days',
    component: WeekDays
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
