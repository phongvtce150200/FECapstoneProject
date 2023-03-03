<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <!-- body -->
  <div class="container">
    <div class="row w-100">
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
        <img
          src="@/assets/image/3636112-removebg-preview1.png"
          alt=""
          class="img-form-center"
        />
      </div>
      <!-- Form Right -->
      <div class="col-sm-4">
        <form
          class="form-login"
          @submit.prevent="handleLogin"
          :class="isRegister == true ? 'd-none' : 'd-block'"
        >
          <h2>Welcome User</h2>
          <input type="text" v-model="loginData.userName" placeholder="Email" />
          <input
            type="password"
            v-model="loginData.password"
            placeholder="Password"
          />
          <a
            href="#"
            class="text-black text-end d-block"
            style="margin-top: -10px; margin-right: 20px"
            >Need help?</a
          >
          <button class="confrim">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped src="../assets/style/authentication.css"></style>
<script>
import { HTTP } from "@/axios";
import { ref } from "vue";
export default {
  setup() {
    const loginData = ref({
      userName: "",
      password: "",
    });
    return { loginData };
  },
  methods: {
    async handleLogin() {
      HTTP.post("Authentication/Login", {
        userName: this.loginData.userName,
        password: this.loginData.password,
      }).then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("fullName", response.data.fullName);
        localStorage.setItem("role", response.data.role);
        if (response.data.role == "Doctor") {
          localStorage.setItem("DoctorId", response.data.doctorId);
        }
        if (response.data.role == "Nurse") {
          localStorage.setItem("NurseId", response.data.nurseId);
        }
        localStorage.setItem("usId", response.data.id);
      });
    },
  },
};
</script>
