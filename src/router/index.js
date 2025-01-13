import { createRouter, createWebHistory } from 'vue-router';
import MainContent from '../components/MainContent.vue';
import Introduce from '../components/Introduce.vue';
import Team from '../components/Team.vue';
import Show from '../components/Show.vue';
import Reserve from '../components/Reserve.vue';

const routes = [
  { path: '/', component: MainContent },
  { path: '/introduce', component: Introduce },
  { path: '/team', component: Team },
  { path: '/show', component: Show },
  { path: '/reserve', component: Reserve },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
