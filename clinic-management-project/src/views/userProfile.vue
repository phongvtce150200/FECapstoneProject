<template>
  <div class="mb-4">
    <div class="container py-5">
      <div class="row justify-content-center align-items-center h-100">
        <div class="col-12 col-lg-9 col-xl-7">
          <div
            class="card shadow-2-strong card-registration"
            style="border-radius: 15px"
          >
            <div class="card-body p-4 p-md-5">
              <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">Edit your infomation</h3>

              <div class="row">
                <div class="col-md-6 mb-4">
                  <div class="form-outline">
                    <h6 class="mb-2 pb-1">First Name:</h6>
                    <InputText
                      type="text"
                      v-model="patientInfomation.firstName"
                    />
                  </div>
                </div>
                <div class="col-md-6 mb-4">
                  <div class="form-outline">
                    <h6 class="mb-2 pb-1">Last Name:</h6>
                    <InputText
                      type="text"
                      v-model="patientInfomation.lastName"
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mb-4 d-flex align-items-center">
                  <div class="form-outline datepicker w-100">
                    <h6 class="mb-2 pb-1">Birth Day:</h6>
                    <Calendar
                      id="birthdayDate"
                      v-model="patientInfomation.birthDay"
                      dateFormat="dd/mm/yy"
                    />
                  </div>
                </div>
                <div class="col-md-6 mb-4">
                  <h6 class="mb-2 pb-1">Gender:</h6>

                  <div
                    class="form-check form-check-inline"
                    style="padding-left: 0"
                  >
                    <RadioButton
                      inputId="femaleGender"
                      name="pizza"
                      v-model="patientInfomation.gender"
                      value="Female"
                    />
                    <label class="form-check-label ml-2" for="femaleGender"
                      >Female</label
                    >
                  </div>

                  <div class="form-check form-check-inline">
                    <RadioButton
                      inputId="maleGender"
                      name="pizza"
                      v-model="patientInfomation.gender"
                      value="Male"
                    />
                    <label class="form-check-label ml-2" for="maleGender"
                      >Male</label
                    >
                  </div>

                  <div class="form-check form-check-inline">
                    <RadioButton
                      inputId="otherGender"
                      name="pizza"
                      v-model="patientInfomation.gender"
                      value="Undefine"
                    />
                    <label class="form-check-label ml-2" for="otherGender"
                      >Other</label
                    >
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mb-4 pb-2">
                  <div class="form-outline">
                    <h6 class="mb-2 pb-1">Email:</h6>
                    <InputText type="email" v-model="patientInfomation.email" />
                  </div>
                </div>
                <div class="col-md-6 mb-4 pb-2">
                  <div class="form-outline">
                    <h6 class="mb-2 pb-1">Phone Number:</h6>
                    <InputText
                      type="tel"
                      v-model="patientInfomation.phoneNumber"
                    />
                  </div>
                </div>
              </div>

              <div class="mt-4 pt-2 justify-content-between">
                <button
                  class="btn btn-primary btn-lg me-2"
                  @click="EditInfomation()"
                >
                  Submit
                </button>
                <router-link
                  class="btn btn-danger btn-lg"
                  :to="{ name: 'home', params: {} }"
                  >Back To Home</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { HTTP } from "@/axios";
export default {
  name: "UserProfile",
  data() {
    return {
      patientInfomation: {
        firstName: null,
        lastName: null,
        address: null,
        birthDay: null,
        email: null,
        gender: null,
        phoneNumber: null,
      },
    };
  },
  created() {
    this.getPatientInfomation();
  },
  beforeUpdate() {},
  methods: {
    dateToYMD(end_date) {
      var ed = new Date(end_date);
      var d = ed.getDate();
      var m = ed.getMonth() + 1;
      var y = ed.getFullYear();
      return (
        "" + y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d)
      );
    },
    getPatientInfomation() {
      HTTP.get("Patient/GetPatientById?id=" + localStorage.getItem("PatientId"))
        .then((res) => {
          this.patientInfomation = { ...res.data.user };
          this.patientInfomation.birthDay = this.dateToYMD(
            this.patientInfomation.birthDay
          );
          console.log(this.patientInfomation);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    EditInfomation() {
      HTTP.put(
        "Patient/EditPatientInfomation/" + localStorage.getItem("PatientId"),
        this.patientInfomation
      )
        .then((res) => {
          console.log(res);
          this.showSuccess(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showSuccess(mess) {
      this.$toast.add({
        severity: "success",
        summary: "Success Message",
        detail: mess,
        life: 3000,
      });
    },
  },
};
</script>
<style scoped>
.card-registration .select-input.form-control[readonly]:not([disabled]) {
  font-size: 1rem;
  line-height: 2.15;
  padding-left: 0.75em;
  padding-right: 0.75em;
}
.card-registration .select-arrow {
  top: 13px;
}
</style>
