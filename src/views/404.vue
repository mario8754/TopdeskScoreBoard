<template>
  <NotFound />
</template>

<script>
import NotFound from "@/components/NotFound";
export default {
  data() {
    return {
      data: [],
    };
  },
  components: {
    NotFound,
  },
  metaInfo: {
    title: "Pagina niet gevonden ",
    htmlAttrs: {
      lang: "EN",
      amp: true,
    },
  },
};
</script>