<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <!-- body -->
  <div class="container">
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
        <input v-model="registerData.email" type="email" placeholder="Email" />
        <select name="" id="" v-model="registerData.gender">
          <option value="" disabled selected>Gender</option>
          <option value="1">Male</option>
          <option value="0">Female</option>
          <option value="2">Undefine</option>
        </select>
      </div>

      <input v-model="registerData.address" type="text" placeholder="Address" />

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
</template>
<style src="../assets/style/register.css"></style>
<script>
import { HTTP } from "@/axios";
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

    return { isRegister, registerData };
  },
  mounted() {
    console.log(this.isRegister);
  },
  methods: {
    async handleRegister(e) {
      e.preventDefault();
      // eslint-disable-next-line no-unused-vars
      HTTP.post("Authentication/Register", JSON.stringify(this.registerData))
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
