import Vue from 'vue';
import VueRouter from 'vue-router';


Vue.use(VueRouter);


const routes = [
  {
    path: '/',
    name: 'Ranking',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Ranking.vue'),
 
  },

  {
    path: '/Events',
    name: 'Events',
    component: () =>
      import(
        /* webpackChunkName: "Events" */ '../views/Events.vue'
      ),

  },
 

  {
    path: '/Speluitleg',
    name: 'Speluitleg',
    component: () =>
      import(
        /* webpackChunkName: "Speluitleg" */ '../views/Speluitleg.vue'
      ),

  },

  {
    path: '*',
    name: 'NotFound',
    component: () =>
      import(/* webpackChunkName: "NotFound" */ '@/views/404.vue'),
    meta: { title: ' Kantoorflex | Oeps pagina niet gevonden' },
  },
];

const router = new VueRouter({
  mode: 'history',
  //Dit voor weer naar begin
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach();
export default router;
