<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <!-- <div class="col-md-2" style="margin-right: 5px">
      <table
        class="table border-secondary"
        style="max-height: 300px"
        border="1"
      >
        <thead>
          <tr>
            <th class="table-danger">
              <p>Search</p>
            </th>
          </tr>
          <tr>
            <th>
              <form action="">
                <input
                  @keyup="search"
                  class="form-control"
                  type="text"
                  v-model="keyword"
                  placeholder="Find Patient"
                  style="text-align: center"
                />
              </form>
            </th>
          </tr>
        </thead>
        <tbody id="patientBody">
          <tr
            v-for="(item, index) in patients"
            :key="index"
            style="display: table; width: 100%; table-layout: fixed"
          >
            <td>
              <button
                @click="setData(index)"
                style="border: none; background: none"
              >
                {{ item.user.fullName }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div> -->
  <div>
    <form action="" id="PatientInfomationForm"></form>
    <table class="table table-bordered border-secondary">
      <thead>
        <tr class="table-danger">
          <th>
            <p>Patient Infomation</p>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="d-flex justify-content-between">
            Full Name:
            <!-- <input
              v-model="queue.fullName"
              type="text"
              class="form-control"
              id="requestQueue"
              readonly
            /> -->
            <!-- chỗ này xài watch -->
            <AutoComplete
              v-model="queue.fullName"
              :suggestions="filteredPatients"
              @complete="searchPatient($event)"
              optionLabel="user.fullName"
            />
            DoB:
            <input
              v-model="queue.birthDay"
              type="date"
              class="form-control"
              style="width: 200px"
              id="requestQueue"
              readonly
            />
            Gender:
            <input
              v-model="queue.gender"
              type="text"
              class="form-control"
              style="width: 80px"
              id="requestQueue"
              readonly
            />
          </td>

          <td class="d-flex justify-content-between">
            Address:
            <input
              v-model="queue.address"
              type="text"
              class="form-control"
              style="width: 550px"
              id="requestQueue"
              readonly
            />

            Phone Number:
            <input
              v-model="queue.phoneNumber"
              type="text"
              class="form-control"
              style="width: 200px"
              id="requestQueue"
              readonly
            />
          </td>

          <td class="d-flex justify-content-between">
            Pulse:
            <input
              type="number"
              v-model="queue.Pulse"
              placeholder="bpm"
              class="form-control"
              style="width: 82px"
              id="requestQueue"
            />
            Blood Pressure:
            <input
              type="number"
              v-model="queue.BloodPressure"
              placeholder="mmHg"
              class="form-control"
              style="width: 82px"
              id="requestQueue"
            />
            Temperature:
            <input
              type="number"
              v-model="queue.Tempurature"
              placeholder="°C"
              class="form-control"
              style="width: 82px"
              id="requestQueue"
            />
            Weight:
            <input
              type="number"
              v-model="queue.Weight"
              placeholder="Kg"
              class="form-control"
              style="width: 82px"
              id="requestQueue"
            />
            Height:
            <input
              type="number"
              v-model="queue.Height"
              placeholder="Cm"
              class="form-control"
              style="width: 82px"
              id="requestQueue"
            />
            Doctor:
            <select
              v-model="queue.doctorId"
              class="form-control"
              id="requestQueue"
              style="width: 130px"
            >
              <option
                v-for="option in doctors"
                :value="option.id"
                :key="option.id"
              >
                {{ option.user.fullName }}
              </option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex">
      <div class="col-md-8">
        <table class="table table-bordered border-secondary">
          <thead>
            <tr>
              <th class="table-danger">
                <div class="d-flex justify-content-between">
                  <p>Appoitment Schedule of Doctor</p>
                  <div class="d-flex">
                    <p>Doctor:</p>
                    <select v-model="idDoctor" class="form-control">
                      <option
                        v-for="(option, index) in doctors"
                        :value="option.id"
                        :key="index"
                      >
                        {{ option.user.fullName }}
                      </option>
                    </select>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody style="height: 500px">
            <tr>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-4">
        <div>
          <table
            class="table table-bordered border-secondary"
            style="margin-left: 5px"
          >
            <thead>
              <tr>
                <th class="table-danger">
                  <div class="d-flex justify-content-between">
                    <p>Print queue ticket</p>
                    <a href="" style="text-decoration: none; color: black">
                      <i class="fa-solid fa-print"></i>
                    </a>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody style="height: 350px">
              <tr>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style="text-align: center">
          <input
            form="requestQueue"
            type="submit"
            @click="createQueue"
            class="btn btn-success"
            value="Transfer Patient"
          />
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
        Pulse: "",
        BloodPressure: "",
        Tempurature: "",
        Weight: "",
        Height: "",
        doctorId: "",
      },
      filteredPatients: null,
    };
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
    setData(index) {
      this.queue.patientid = this.patients[index].id;
      this.queue.fullName = this.patients[index].user.fullName;
      this.queue.address = this.patients[index].user.address;
      this.queue.phoneNumber = this.patients[index].user.phoneNumber;
      this.queue.gender = this.patients[index].user.gender;
      this.queue.birthDay = this.dateToYMD(this.patients[index].user.birthDay);
    },
    // search() {
    //   if (this.timer) {
    //     clearTimeout(this.timer);
    //     this.timer = null;
    //   }
    //   this.timer = setTimeout(() => {
    //     let result = this.patients;
    //     if (!this.keyword) {
    //       return this.getPatient();
    //     }
    //     const filterValue = this.keyword.toLowerCase();
    //     const searchRegex = new RegExp(filterValue, "iu");
    //     result = this.patients.filter(
    //       (event) => !filterValue || searchRegex.test(event.fullName)
    //     );
    //     console.log(result);
    //     return (this.patients = result);
    //   }, 100);
    // },
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
        .then((response) => {
          this.doctors = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async createQueue(e) {
      e.preventDefault();
      console.log(this.queue);
      HTTP.post("Queue", JSON.stringify(this.queue))
        .then((respone) => {
          console.log(respone);
        })
        .catch((error) => {
          console.log(error);
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
  width: 500px;
}
</style>
