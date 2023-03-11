<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <!-- User profile picture -->
        <!-- <Image
          :src="require('@/assets/image/doctorImg.jpg')"
          alt="Image"
          preview
          class="card-top"
        /> -->
      </div>
      <div class="col-md-9">
        <!-- Profile editing form -->
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <h3>
              Doctor {{ doctorInfo.user.firstName }}
              {{ doctorInfo.user.lastName }} Profile Settings
            </h3>
            <div class="d-flex">
              <!-- Left form component -->
              <div class="p-2 flex-fill">
                <div class="d-flex justify-content-around">
                  <!-- First column -->
                  <div class="p-2 flex-fill">
                    <label>First Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="firstname"
                      placeholder="First Name"
                      v-model="doctorInfo.user.firstName"
                    />
                  </div>
                  <!-- Second column -->
                  <div class="p-2 flex-fill">
                    <label>Last Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="lastname"
                      placeholder="Last Name"
                      v-model="doctorInfo.user.lastName"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- Right form component -->
            <div class="p-2 flex">
              <div class="p-2 flex-fill">
                <label>User Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  placeholder="User Name"
                  v-model="doctorInfo.user.userName"
                />
              </div>
              <div class="p-2 flex-fill">
                <label>Date of Birth</label>
                <Calendar
                  class="w-100"
                  id="birthday"
                  v-model="doctorInfo.user.birthDay"
                  dateFormat="dd/mm/yy"
                />
              </div>
              <div class="p-2 flex-fill">
                <label>Phone Number</label>
                <input
                  type="text"
                  class="form-control"
                  id="phonenum"
                  placeholder="Phone number"
                  v-model="doctorInfo.user.phoneNumber"
                />
              </div>
              <div class="p-2 flex-fill">
                <label>Email Address</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="Email Address"
                  v-model="doctorInfo.user.email"
                />
              </div>
              <div class="p-2 flex-fill">
                <label>Address</label>
                <input
                  type="text"
                  class="form-control"
                  id="address"
                  placeholder="Address"
                  v-model="doctorInfo.user.address"
                />
              </div>
              <div class="p-2 flex-fill">
                <label>Gender</label>
                <Dropdown
                  class="form-control"
                  optionLabel="name"
                  optionValue="code"
                  placeholder="Select Gender"
                  :options="selectGender"
                  option-label="name"
                  :editable="true"
                  v-model="doctorInfo.user.gender"
                />
              </div>
              <div class="p-2 flex-fill">
                <label>Experience</label>
                <InputNumber
                  class="w-100"
                  prefix="Experience in "
                  suffix=" Year"
                  placeholder="Experience in ... Year"
                  v-model="doctorInfo.experience"
                />
              </div>
              <div class="p-2 flex-fill">
                <Button
                  label="Save changes"
                  class="p-button-raised p-button-primary me-2"
                  @click="handleSubmit(this.doctorInfo.id)"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style>
.form-control {
  border-radius: 15px;
}

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
import { HTTP } from "@/axios";

// import { HTTP } from "@/axios";
export default {
  data() {
    return {
      doctorInfo: {
        id: null,
        experience: null,
        user: {
          firstName: null,
          lastName: null,
          gender: null,
          birthDay: null,
          address: null,
          email: null,
          userName: null,
          phoneNumber: null,
        },
      },

      selectGender: [
        { name: "Female", code: "0" },
        { name: "Male", code: "1" },
        { name: "Undefine", code: "2" },
      ],
    };
  },

  async created() {
    this.GetDocById();
  },
  methods: {
    async GetDocById() {
      this.loading = true;
      await HTTP.get(`Doctor/GetDoctorById?doctorId=1`).then((res) => {
        ((this.doctorInfo.user = { ...res.data.user }),
        (this.doctorInfo = { ...res.data })),
          console.log(this.doctorInfo);
      });
    },
    async handleSubmit(id) {
      this.$confirm.require({
        message: "Do you want to update your profile?",
        header: "Update User's Profile",
        icon: "fa fa-user-circle-o",
        acceptClass: "p-button-success",
        accept: async () => {
          HTTP.put("Doctor/EditDoctor?id=" + id, this.doctorInfo).then(
            (res) => {
              console.log(res);
              this.$toast.add({
                severity: "success",
                summary: "Confirmed",
                detail: "User have Updated Profile!",
                life: 3000,
              });
            }
          );
        },
        reject: () => {
          this.$toast.add({
            severity: "error",
            summary: "Rejected",
            detail: "User Rejected to Update Profile!",
            life: 3000,
          });
        },
      });
    },
  },
};
</script>
