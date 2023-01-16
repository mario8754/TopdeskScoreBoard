<template>
  <Portal />
</template>

<script>
import Portal from "@/components/Portal";
export default {
  data() {
    return {
      data: [],
    };
  },
  components: {
   Portal,
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