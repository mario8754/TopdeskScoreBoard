import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase';
import axios from 'axios';


Vue.use(VueRouter);
const isLoggedIn = () => firebase.auth().currentUser;


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
    path: '/Dashboard',
    name: 'Dashboard',
    component: () =>
      import(
        /* webpackChunkName: "Blogeheren" */ '../views/Dashboard/Dashboard.vue'
      ),
    meta: {
      requiresAuth: true,
      accessRights: ['BEHEERDER'],
      title: ' TOPDESK SOQQER',
    },
  },

  {
    path: '/Login',
    name: 'Login',
    component: () =>
      import(
        /* webpackChunkName: "Speluitleg" */ '../views/Login.vue'
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


export async function setFirebaseToken() {
  const token = (await isLoggedIn())
    ? await firebase.auth().currentUser.getIdToken(true)
    : null;
  if (token) axios.defaults.headers.common['fireToken'] = token;
}

async function onAuthRequired(to, from, next) {
  document.title = to.meta.title || 'TOPDESK SOQQER| TOPDESK';
  await setFirebaseToken();
  if (to.meta.requiresAuth) {
    if (!isLoggedIn()) {
      next({
        path: '/Inloggen',
        query: { redirect: to.fullPath }
      })
    }
    const response = await axios.get(
      `https://score.hacketon.nl/api/whoami`
    );
    const accessRight = response.data.accessRight;
    if (to.meta.accessRights && !to.meta.accessRights.includes(accessRight)){
      if (["BEHEERDER"].includes(accessRight)) {
        next("/Dashboard")
     
    }else {
        next("Inloggen")
      }
      return;
    }

  }
  next();
}
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

router.beforeEach(onAuthRequired);
export default router;
