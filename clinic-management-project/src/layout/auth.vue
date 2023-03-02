<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <header-component />
  <!-- Form Left -->
  <div class="form-left col-sm-2 mt-4">
    <h1>Sign up to track your health</h1>
    <p>
      if you have ready an account you can
      <a href="#" class="Login-text" target="_blank">Login </a>here
    </p>
    <div class="text-span"></div>
  </div>
  <!-- Form Center -->
  <div class="col-sm-4 form-center">
    <!-- <img src="@/assets/image/3636112-removebg-preview1.png" alt="" class="img-form-center" /> -->
  </div>
  <div class="col-sm-4">
    <slot />
  </div>
</template>
<script>
import HeaderComponent from "@/components/HeaderComponent";
export default {
  components: { HeaderComponent },
};
</script>
