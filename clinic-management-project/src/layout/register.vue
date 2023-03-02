<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <header-component />
  <slot />
  <footer-component />
</template>
<script>
import HeaderComponent from "@/components/HeaderComponent";
import FooterComponent from "@/components/FooterComponent";
export default {
  components: { HeaderComponent, FooterComponent },
};
</script>
