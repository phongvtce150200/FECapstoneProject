<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <!-- body -->
  <form class="form-register">
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
    <div class="d-flex justify-content-center">
      <button type="submit" class="confrim w-50">Submit</button>
    </div>
  </form>
</template>
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
