<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <header-component />
  <slot />
</template>
<script>
import HeaderComponent from "@/components/HeaderComponent";
export default {
  components: { HeaderComponent },
};
</script>
