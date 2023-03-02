<template>
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

        <ul class="nav" v-if="!isLoggedIn">
          <router-link
            :to="{ name: 'Login', params: {} }"
            class="nav-link"
            @click="isLogin"
            >Sign In</router-link
          >
          <router-link :to="{ name: 'Register', params: {} }">
            <button @click="isRegister">Register</button>
          </router-link>
        </ul>
        <ul class="nav" v-else>
          <a href="" class="nav-link">Hello {{ fullName }}</a>
          <button id="Logout" @click="logout">Logout</button>
        </ul>
      </nav>
    </div>
  </header>
</template>
<script>
import { inject } from "vue";
// import { ref } from "vue";
export default {
  data() {
    return {
      fullName: localStorage.getItem("fullName"),
      register: true,
      login: false,
    };
  },
  setup() {
    const emitter = inject("emitter");
    const registerClick = (item) => {
      emitter.emit("myevent", item);
    };
    const loginClick = (item) => {
      emitter.emit("myevent", item);
    };
    return {
      registerClick,
      loginClick,
    };
  },
  computed: {
    isLoggedIn() {
      return window.localStorage.getItem("fullName");
    },
  },
  methods: {
    logout() {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("fullName");
      window.localStorage.removeItem("role");
      window.localStorage.removeItem("usId");
      window.localStorage.removeItem("DoctorId");
      this.$router.go();
    },
    isRegister() {
      this.registerClick(this.register);
    },
    isLogin() {
      this.loginClick(this.login);
    },
  },
};
</script>
