<template>
  <Upcoming />
</template>

<script>
import Upcoming from "@/components/Upcoming";
export default {
  data() {
    return {
      data: [],
    };
  },
  components: {
    Upcoming,
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