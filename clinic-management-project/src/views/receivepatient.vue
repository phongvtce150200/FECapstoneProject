<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <fieldset>
    <legend><h5>Patient Infomation</h5></legend>
    <div class="fieldset-content">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <span>Full Name:</span>
          <AutoComplete
            v-model="queueDetails"
            :suggestions="filteredPatients"
            @complete="searchPatient($event)"
            optionLabel="user.fullName"
            class="form-control"
          />
        </div>
        <div>
          <span> DoB:</span>
          <InputText
            type="date"
            v-model="queue.birthDay"
            readonly
            class="form-control"
          />
        </div>
        <div>
          <span> Gender:</span>
          <InputText
            type="text"
            v-model="queue.gender"
            readonly
            class="form-control"
          />
        </div>
        <div class="address">
          <span> Address:</span>
          <InputText
            type="text"
            v-model="queue.address"
            readonly
            class="form-control"
          />
        </div>
        <div class="phone">
          <span>Phone Number:</span>
          <InputText
            type="text"
            v-model="queue.phoneNumber"
            readonly
            class="form-control"
          />
        </div>
      </div>
      <div class="d-flex justify-content-between">
        <div>
          <span>Pulse:</span>
          <InputNumber
            inputId="withoutgrouping"
            v-model="inputQueue.Pulse"
            mode="decimal"
            :useGrouping="false"
            placeholder="bpm"
            class="form-control"
          />
        </div>
        <div>
          <span> Blood Pressure:</span>
          <InputNumber
            inputId="withoutgrouping"
            v-model="inputQueue.BloodPressure"
            mode="decimal"
            :useGrouping="false"
            placeholder="mmHg"
            class="form-control"
          />
        </div>
        <div>
          <span>Temperature:</span>
          <InputNumber
            inputId="withoutgrouping"
            v-model="inputQueue.Tempurature"
            mode="decimal"
            :useGrouping="false"
            placeholder="°C"
            class="form-control"
          />
        </div>
        <div>
          <span> Weight:</span>
          <InputNumber
            inputId="withoutgrouping"
            v-model="inputQueue.Weight"
            mode="decimal"
            :useGrouping="false"
            placeholder="Kg"
            class="form-control"
          />
        </div>
        <div>
          Height:
          <InputNumber
            inputId="withoutgrouping"
            v-model="inputQueue.Height"
            mode="decimal"
            :useGrouping="false"
            placeholder="Cm"
            class="form-control"
          />
        </div>
        <div>
          Doctor:
          <Dropdown
            v-model="doctor.doctorId"
            :options="doctors"
            optionValue="id"
            optionLabel="fullName"
            placeholder="Select a Doctor"
            class="form-control"
          />
        </div>
      </div>
    </div>
  </fieldset>
  <div class="mt-3">
    <div class="d-flex">
      <div class="col-md-8">
        <fieldset>
          <legend>
            <div class="d-flex justify-content-between align-items-center">
              <h5>Doctor's Appoitment</h5>
              <div>
                <Dropdown
                  v-model="idDoctor"
                  :options="doctors"
                  optionValue="id"
                  optionLabel="fullName"
                  placeholder="Select a Doctor"
                />
              </div>
            </div>
          </legend>
          <div class="fieldset-content" style="height: 500px"></div>
        </fieldset>
      </div>
      <div class="col-md-4 ms-2">
        <div>
          <fieldset>
            <legend>
              <div
                class="d-flex justify-content-between align-items-center"
                style="height: 44px"
              >
                <h5>Queue Ticket</h5>
                <a href="" style="text-decoration: none; color: black">
                  <i class="fa-solid fa-print"></i>
                </a>
              </div>
            </legend>
            <div class="fieldset-content" style="height: 300px"></div>
          </fieldset>
        </div>
        <div class="text-center mt-2">
          <Button label="Transfer Patient" @click="createQueue" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { HTTP } from "@/axios";
import { ref } from "vue";
export default {
  async created() {
    await this.getPatient();
    await this.getAllDoctor();
  },
  data() {
    return {
      selected: ref(0),
      idDoctor: ref(0),
      keyword: null,
      patients: [],
      doctors: [],
      queue: {
        patientid: "",
        fullName: "",
        birthDay: "",
        address: "",
        gender: "",
        phoneNumber: "",
      },
      doctor: {
        doctorId: null,
      },
      inputQueue: {
        Pulse: null,
        BloodPressure: null,
        Tempurature: null,
        Weight: null,
        Height: null,
      },
      filteredPatients: null,
      queueDetails: null,
    };
  },
  beforeUpdate() {
    if (this.queueDetails != null) {
      this.queue = { ...this.queueDetails.user };
      this.queue.birthDay = this.dateToYMD(this.queue.birthDay);
      this.queue.patientid = this.queueDetails.id;
    }
  },
  methods: {
    async getPatient() {
      HTTP.get("Patient/GetAllPatient")
        .then((response) => {
          this.patients = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    dateToYMD(end_date) {
      var ed = new Date(end_date);
      var d = ed.getDate();
      var m = ed.getMonth() + 1;
      var y = ed.getFullYear();
      return (
        "" + y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d)
      );
    },
    async getAllDoctor() {
      HTTP.get("Doctor/GetAllDoctor")
        .then((res) => {
          res.data.forEach((el) => {
            this.doctors.push({
              experience: el.experience,
              id: el.id,
              fullName: el.user.fullName,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async createQueue() {
      var data = {
        patientid: this.queue.patientid,
        fullName: this.queue.fullName,
        birthDay: this.queue.birthDay,
        address: this.queue.address,
        gender: this.queue.gender,
        phoneNumber: this.queue.phoneNumber,
        Pulse: this.inputQueue.Pulse,
        BloodPressure: this.inputQueue.BloodPressure,
        Tempurature: this.inputQueue.Tempurature,
        Weight: this.inputQueue.Weight,
        Height: this.inputQueue.Height,
        doctorId: this.doctor.doctorId,
      };
      console.log(data);
      console.log(this.queue);
      this.$confirm.require({
        message: "Do you want to transfer patient " + data.fullName,
        header: "Transfer Confirmation",
        icon: "pi pi-info-circle",
        acceptClass: "p-button-success",
        accept: async () => {
          HTTP.post("Queue", data)
            .then((respone) => {
              console.log(respone);
              this.$toast.add({
                severity: "success",
                summary: "Confirmed",
                detail: "Transfer Patient " + data.fullName + " Successfully ",
                life: 3000,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        },
        reject: () => {
          this.$toast.add({
            severity: "error",
            summary: "Rejected",
            detail: "You have rejected",
            life: 3000,
          });
        },
      });
    },
    async searchPatient(event) {
      setTimeout(() => {
        if (!event.query.trim().length) {
          this.filteredPatients = [...this.patients];
        } else {
          this.filteredPatients = this.patients.filter(function (el) {
            return el.user.fullName
              .toLowerCase()
              .includes(event.query.toLowerCase());
          });
        }
      }, 250);
    },
  },
};
</script>
<style>
#patientBody {
  text-align: center;
  display: block;
  height: 150px;
  overflow-y: scroll;
}
.p-autocomplete-input.p-inputtext.p-component {
  width: 400px;
}
.p-autocomplete.p-component.p-inputwrapper {
  width: 400px;
}
fieldset {
  box-sizing: border-box;
  border: 1px solid #dee2e6;
  background: #ffffff;
  color: #495057;
  border-radius: 6px;
}
fieldset legend {
  padding: 1.25rem;
  border: 1px solid #dee2e6;
  color: #343a40;
  background: #f4d7d3;
  font-weight: 700;
  border-radius: 6px;
}
.fieldset-content {
  box-sizing: border-box;
  padding: 1.25rem;
}

.p-inputnumber.p-component.p-inputwrapper.form-control,
.p-autocomplete.p-component.p-inputwrapper.form-control {
  border: none;
  margin-left: -10px;
}
.p-autocomplete.p-component.p-inputwrapper {
  width: 90%;
}
.fieldset-content .p-dropdown {
  height: 55%;
  margin-top: 5px;
  align-items: center;
  width: 180px;
}
</style>
