<template>
  <LoginScreen />
</template>

<script>
import LoginScreen from "@/components/LoginScreen";
export default {
  data() {
    return {
      data: [],
    };
  },
  components: {
    LoginScreen,
  },
  metaInfo: {
    title: "Welkom bij Topdesk | LoginScreen",
    htmlAttrs: {
      lang: "EN",
      amp: true,
    },
  },
};
</script>