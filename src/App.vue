<template>
  <v-app>
    <v-main :style="$route.meta.showFooter === false ? 'padding-left: 64px' : ''">
      <Header v-if="$route.meta.showFooter !== false" />
      <router-view />
    </v-main>
    <Footer v-if="$route.meta.showFooter !== false" />
  </v-app>
</template>

<script>
  import Header from '@/components/Header';
  import Footer from '@/components/Footer';
  export default {
    name: 'App',
    components: {
      Header,
      Footer,
    },
    data: () => ({
      //
    }),
    watch: {
      $route(to) {
        document.title = to.meta.title || 'TOPDesk Fifa ranking';
      },
    },
  };
</script>
