<template>
  <Front />
</template>

<script>
import Front from "@/components/Front";
export default {
  data() {
    return {
      data: [],
    };
  },
  components: {
    Front,
  },
  metaInfo: {
    title: "Welkom bij Topdesk | Tafelvoetbal wedstrijden",
    htmlAttrs: {
      lang: "EN",
      amp: true,
    },
  },
};
</script>