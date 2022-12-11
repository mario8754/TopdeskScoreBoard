import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import VueConfetti from 'vue-confetti'
import VueMeta from 'vue-meta';
import VueSweetalert2 from 'vue-sweetalert2';
import AOS from 'aos';


//conveti
Vue.use(VueConfetti)

//Editor
import Vue2Editor from 'vue2-editor';
Vue.use(Vue2Editor);

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
import 'aos/dist/aos.css';


AOS.init({
  disable: 'mobile',
});
//images
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload);

// QR codes
import VueQRCodeComponent from 'vue-qrcode-component';
Vue.component('qr-code', VueQRCodeComponent);

Vue.use(VueSweetalert2);

Vue.config.productionTip = false;

let app;


  if (!app) {
    new Vue({
      router,
      vuetify,
      render: h => h(App),
    }).$mount('#app');
    app = true;
  }

Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true,
});
