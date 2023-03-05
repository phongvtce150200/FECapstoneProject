<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <!-- User profile picture -->
        <Image
          :src="require('@/assets/image/nurseImg.jpg')"
          alt="Image"
          preview
          class="card-top"
        />
      </div>
      <div class="col-md-9">
        <!-- Profile editing form -->
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <h3>User Profile Settings</h3>
            <div class="d-flex">
              <!-- Left form component -->
              <div class="p-2 flex-fill">
                <div class="d-flex justify-content-around">
                  <!-- First column -->
                  <input
                    type="text"
                    class="form-control"
                    id="firstname"
                    placeholder="First Name"
                    v-model="firstname"
                  />
                  <!-- Second column -->
                  <input
                    type="text"
                    class="form-control"
                    id="lastname"
                    placeholder="Last Name"
                    v-model="lastname"
                  />
                </div>
                <div class="d-flex justify-content-around">
                  <!-- First column -->
                  <input
                    type="text"
                    class="form-control"
                    id="bday"
                    placeholder="Date of Birth"
                    onfocus="(this.type='date')"
                    v-model="birthday"
                  />
                  <!-- Second column -->
                  <input
                    type="text"
                    class="form-control"
                    id="phonenum"
                    placeholder="Phone number"
                    v-model="phoneNumber"
                  />
                </div>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="Email Address"
                  v-model="email"
                />
                <input
                  type="text"
                  class="form-control"
                  id="address"
                  placeholder="Address"
                  v-model="address"
                />
              </div>
              <!-- Right form component -->
              <div class="p-2 flex-fill">
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  placeholder="User Name"
                  v-model="username"
                />
                <input
                  type="password"
                  class="form-control"
                  id="pwd"
                  placeholder="Password"
                  v-model="password"
                />
                <input
                  type="password"
                  class="form-control"
                  id="confirmPwd"
                  placeholder="Confirm Password"
                  v-model="confirmPassword"
                />
                <button type="submit" class="btn btn-primary w-100">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style>
.p-image.p-component.card-top.p-image-preview-container img {
  width: 250px;
  height: 250px;
  border-radius: 500px /500px;
}

.p-image-preview-indicator {
  border-radius: 500px;
}
</style>
<script>
export default {
  name: "UserProfile",
  data() {
    return {
      username: "",
      email: "",
    };
  },
  methods: {
    handleSubmit() {
      // handle form submission here
      console.log(
        "Submitting form with username:",
        this.username,
        "and email:",
        this.email
      );
    },
  },
};
</script>
