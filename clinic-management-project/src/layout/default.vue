<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Toast />
  <ConfirmDialog></ConfirmDialog>
  <header-component />
  <div class="content">
    <slot />
  </div>
  <footer-component />
</template>
<script>
import HeaderComponent from "@/components/HeaderComponent";
import FooterComponent from "@/components/FooterComponent";
export default {
  components: { HeaderComponent, FooterComponent },
};
</script>
