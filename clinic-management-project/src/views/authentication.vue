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
        <form
          class="form-register mb-4"
          :class="isRegister ? 'd-block' : 'd-none'"
          @submit.prevent="handleRegister"
        >
          <h2>Register for more</h2>
          <div class="d-flex justify-content-around">
            <input
              v-model="registerData.firstName"
              type="text"
              placeholder="First Name"
            />
            <input
              v-model="registerData.lastName"
              type="text"
              placeholder="Last Name"
            />
          </div>
          <div class="d-flex justify-content-around">
            <input
              v-model="registerData.email"
              type="email"
              placeholder="Email"
            />
            <select name="" id="" v-model="registerData.gender">
              <option value="" disabled selected>Gender</option>
              <option value="1">Male</option>
              <option value="0">Female</option>
              <option value="2">Undefine</option>
            </select>
          </div>

          <input
            v-model="registerData.address"
            type="text"
            placeholder="Address"
          />

          <div class="d-flex justify-content-around">
            <input
              v-model="registerData.birthday"
              placeholder="Birth date"
              class="textbox-n"
              type="text"
              onfocus="(this.type='date')"
              id="date"
            />
            <input
              v-model="registerData.phoneNumber"
              type="text"
              placeholder="Phone Number"
            />
          </div>
          <input
            v-model="registerData.UserName"
            type="text"
            placeholder="Username"
          />
          <div class="d-flex justify-content-around">
            <input
              type="password"
              placeholder="Password"
              v-model="registerData.Password"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              v-model="registerData.ConfirmPass"
            />
          </div>
          <a
            href="#"
            class="text-black text-end d-block"
            style="margin-top: -10px; margin-right: 20px"
            >Need help?</a
          >
          <button type="submit" class="confrim">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped src="../assets/style/authentication.css"></style>
<script>
import axios from "axios";
import { inject } from "vue";
import { ref } from "vue";
export default {
  // data() {
  //   return {
  //     userName: "",
  //     password: "",
  //     value: true,
  //   };
  // },
  setup() {
    let isRegister = ref();
    const loginData = ref({
      userName: "",
      password: "",
    });
    const registerData = ref({
      UserName: "",
      Password: "",
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      birthday: "",
      phoneNumber: "",
      ConfirmPass: "",
      gender: "",
    });
    const emitter = inject("emitter"); // Inject `emitter`
    emitter.on("myevent", (value) => {
      isRegister.value = value;
    });

    return { isRegister, loginData, registerData };
  },
  mounted() {
    console.log(this.isRegister);
  },
  methods: {
    // onRegister(value) {
    //   this.isRegister = value;
    // },
    async handleLogin() {
      // eslint-disable-next-line no-unused-vars
      const respone = await axios
        .post("Authentication/Login", {
          userName: this.loginData.userName,
          password: this.loginData.password,
        })
        .then((respone) => {
          localStorage.setItem("token", respone.data.token);
          localStorage.setItem("fullName", respone.data.fullName);
          localStorage.setItem("role", respone.data.role);
          if (respone.data.role == "Doctor") {
            localStorage.setItem("DoctorId", respone.data.doctorId);
          }
          if (respone.data.role == "Nurse") {
            localStorage.setItem("NurseId", respone.data.nurseId);
          }
          localStorage.setItem("usId", respone.data.id);
        });
      this.$router.push({ name: "home", params: {} });
    },
    async handleRegister(e) {
      e.preventDefault();
      // eslint-disable-next-line no-unused-vars
      const respone = await axios
        .post("Authentication/Register", JSON.stringify(this.registerData), {
          headers: { "Content-Type": "application/json; charset=utf8" },
        })
        .then((respone) => {
          console.log(respone);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
