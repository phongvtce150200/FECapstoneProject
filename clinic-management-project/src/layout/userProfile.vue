<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Toast />
  <ConfirmDialog></ConfirmDialog>
  <header>
    <div class="container-fluid mt-3">
      <nav class="navbar">
        <!-- logo -->
        <ul class="navbar-nav">
          <div class="navbar__logo">
            <img src="../assets/image/VTP2_1.svg" alt="website logo" />
          </div>
        </ul>
        <!-- links -->
        <ul class="nav">
          <li class="nav-item">
            <router-link :to="{ name: 'home', params: {} }" class="nav-link"
              >Home</router-link
            >
          </li>
          <li class="nav-item"><a href="#" class="nav-link">Service</a></li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'Appointment', params: {} }"
              class="nav-link"
              >Make Appointment</router-link
            >
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">Our Doctor</a>
          </li>
          <li class="nav-item"><a href="#" class="nav-link">About Us</a></li>
        </ul>
        <ul class="nav">
          <a href="" class="nav-link">Hello Test User</a>
        </ul>
        <ul>
          <button id="Logout" @click="logout">Logout</button>
        </ul>
      </nav>
    </div>
  </header>
  <slot />
  <footer-component />
</template>
<script>
import FooterComponent from "@/components/FooterComponent";
export default {
  components: { FooterComponent },
};
</script>
