<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <!-- body -->
  <div class="form-register">
    <div class="d-flex justify-content-center">
      <h2>Register for more</h2>
    </div>
    <div class="d-flex justify-content-around">
      <input
        type="text"
        placeholder="First Name"
        v-model="registerData.firstName"
      />
      <input
        type="text"
        placeholder="Last Name"
        v-model="registerData.lastName"
      />
    </div>
    <div class="d-flex justify-content-around">
      <input type="email" placeholder="Email" v-model="registerData.email" />
      <select v-model="registerData.gender">
        <option value="" disabled selected>Gender</option>
        <option value="1">Male</option>
        <option value="0">Female</option>
        <option value="2">Undefine</option>
      </select>
    </div>
    <div class="d-flex justify-content-around">
      <input type="text" placeholder="Address" v-model="registerData.address" />
      <input type="number" placeholder="National ID" />
    </div>
    <div class="d-flex justify-content-around">
      <input
        placeholder="Birth date"
        class="textbox-n"
        type="text"
        onfocus="(this.type='date')"
        id="date"
        v-model="registerData.birthday"
      />
      <input
        type="text"
        placeholder="Phone Number"
        v-model="registerData.phoneNumber"
      />
    </div>
    <input type="text" placeholder="Username" v-model="registerData.UserName" />
    <div class="d-flex justify-content-around">
      <input
        type="password"
        placeholder="Password"
        v-model="registerData.Password"
      />
      <input type="password" placeholder="Confirm Password" />
    </div>
    <a
      href="#"
      class="text-black text-end d-block"
      style="margin-top: -10px; margin-right: 20px"
      >Need help?</a
    >
    <div class="d-flex justify-content-center">
      <button type="submit" class="confrim w-50" @click="register">
        Submit
      </button>
    </div>
  </div>
</template>
<style src="../assets/style/authentication.css" scoped></style>
<script>
import { HTTP } from "@/axios";
import { ref } from "vue";
export default {
  setup() {
    let registerData = ref({
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
    return { registerData };
  },
  methods: {
    async register() {
      HTTP.post("Authentication/Register", this.registerData)
        .then((respone) => {
          console.log(respone);
          this.$router.push({ name: "Login", params: {} });
          this.showSuccess();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  showSuccess() {
    this.$toast.add({
      severity: "success",
      summary: "Success Message",
      detail: "Message Content",
      life: 3000,
    });
  },
};
</script>
