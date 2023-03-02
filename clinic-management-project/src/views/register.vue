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
        <form>
          <div class="d-flex justify-content-center">
            <h2>Register for more</h2>
          </div>
          <div class="d-flex justify-content-around">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
          </div>
          <div class="d-flex justify-content-around">
            <input type="email" placeholder="Email" />
            <select name="" id="">
              <option value="" disabled selected>Gender</option>
              <option value="1">Male</option>
              <option value="0">Female</option>
              <option value="2">Undefine</option>
            </select>
          </div>
          <div class="d-flex justify-content-around">
            <input type="text" placeholder="Address" />
            <input type="number" placeholder="National ID" />
          </div>
          <div class="d-flex justify-content-around">
            <input
              placeholder="Birth date"
              class="textbox-n"
              type="text"
              onfocus="(this.type='date')"
              id="date"
            />
            <input type="text" placeholder="Phone Number" />
          </div>
          <input type="text" placeholder="Username" />
          <div class="d-flex justify-content-around">
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />
          </div>
          <a
            href="#"
            class="text-black text-end d-block"
            style="margin-top: -10px; margin-right: 20px"
            >Need help?</a
          >
          <button type="submit" class="confrim w-100">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped src="../assets/style/authentication.css"></style>
<script>
// import { HTTP } from "@/axios";
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
  methods: {},
};
</script>
