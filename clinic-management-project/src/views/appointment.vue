<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container mb-4">
    <h1 class="intro-title text-center text-decoration-underline">
      SIGN UP FOR TREATMENT
    </h1>
    <div class="intro-content w-50 container">
      <p>
        Customers wishing to make an appointment at EGO Clinic System, please
        follow the instructions:
      </p>
      <div class="">
        <li>
          Make an appointment by calling the Customer Care switchboard at
          <span> 0287 102 6789</span> – <span>0287 300 6858</span> (EGO General
          Clinic in Can Tho City) or <span> 1800 6858</span> –
          <span>024 7106 6858</span>
          (EGO General Clinic in Hanoi).
        </li>
        <li>Book an appointment online by filling out the form below.</li>
        <li>
          If you don't see any slots to pick, please make sure that you have
          already chosed the doctor and picked a day.
        </li>
        <li>
          Please note, in case of emergency, please immediately go to the
          nearest medical facility or go directly to the EGO Polyclinic System.
        </li>
      </div>
      <Fieldset>
        <template #legend>
          <div class="flex align-items-center text-primary">
            <span class="font-bold text-white text-center"
              >Make Appointment</span
            >
          </div>
        </template>
        <div
          class="container mt-3"
          style="display: flex; justify-content: center"
        >
          <div class="d-flex flex-column">
            <div class="p-2">
              <div class="d-flex flex-row justify-content-between">
                <div class="p-2">
                  <Dropdown
                    v-model="selectDocs"
                    :options="doctors"
                    optionLabel="user.fullName"
                    placeholder="Please select a Doctor"
                  />
                </div>

                <div class="p-2">
                  <div class="field col-12 md:col-4">
                    <Calendar
                      inputId="datetemplate"
                      v-model="date"
                      placeholder="Please pick a day"
                    >
                    </Calendar>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-2">
              <div class="d-flex justify-content-around">
                <MultiSelect
                  v-model="selectServices"
                  :options="services"
                  optionLabel="serviceName"
                  placeholder="Select Services"
                  display="chip"
                  :filter="true"
                />
              </div>
            </div>
            <div class="p-2">
              <div class="container">
                <span>Slots:</span>
                <div class="row mb-3">
                  <!-- <div class="col-sm-4">
                    <div class="cat action">
                      <label>
                        <input
                          type="checkbox"
                          value="1"
                          :disabled="disabledButtons[0]"
                        /><span :class="{ cantChoose: disabledButtons[0] }"
                          >Action</span
                        >
                      </label>
                    </div>
                  </div> -->
                  <div
                    class="col-sm-4"
                    v-for="(disabled, index) in disabledButtons"
                    :key="index"
                  >
                    <div class="cat action">
                      <label>
                        <input
                          type="checkbox"
                          :disabled="disable || !selectDocs || !date"
                          :checked="selectedSlot === index"
                          @click="selectedSlot = index"
                        /><span
                          :class="{
                            cantChoose: disabled || !selectDocs || !date,
                          }"
                          >Slot {{ index + 1 }}</span
                        >
                      </label>
                    </div>
                  </div>
                  <!-- <div class="col-sm-4">
                    <div class="cat action">
                      <label>
                        <input
                          type="checkbox"
                          value="1"
                          :disabled="disabledButtons[1]"
                        /><span :class="{ cantChoose: disabledButtons[1] }"
                          >Action</span
                        >
                      </label>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="cat action">
                      <label>
                        <input
                          type="checkbox"
                          value="1"
                          :disabled="disabledButtons[2]"
                        /><span :class="{ cantChoose: disabledButtons[2] }"
                          >Action</span
                        >
                      </label>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-4">
                    <div class="cat action">
                      <label>
                        <input
                          type="checkbox"
                          value="1"
                          :disabled="disabledButtons[3]"
                        /><span :class="{ cantChoose: disabledButtons[3] }"
                          >Action</span
                        >
                      </label>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="cat action">
                      <label>
                        <input
                          type="checkbox"
                          value="1"
                          :disabled="disabledButtons[4]"
                        /><span :class="{ cantChoose: disabledButtons[4] }"
                          >Action</span
                        >
                      </label>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="cat action">
                      <label>
                        <input
                          type="checkbox"
                          value="1"
                          :disabled="disabledButtons[5]"
                        /><span :class="{ cantChoose: disabledButtons[5] }"
                          >Action</span
                        >
                      </label>
                    </div>
                  </div> -->
                </div>
              </div>
              <span>Reason</span>
              <div class="d-flex justify-content-around mb-3">
                <div>
                  <Textarea
                    :autoResize="false"
                    rows="15"
                    cols="70"
                    placeholder="Enter your medical condition, questions for the doctor and health problems to see"
                  />
                </div>
              </div>
              <a
                href="#"
                class="submit-button d-flex justify-content-center"
                style="text-decoration: none"
              >
                <span class="text-white text-decoration-none">Submit</span>
              </a>
            </div>
          </div>
        </div>
      </Fieldset>
    </div>
  </div>
</template>
<script>
import { HTTP } from "@/axios";

export default {
  data() {
    return {
      date: null,
      selectServices: null,
      services: [],
      doctors: [],
      schedules: [],
      disabledButtons: [false, false, false, false, false, false],
      selectDocs: null,
      appointment: {
        DoctorId: null,
        PatientId: localStorage.getItem("PatientId"),
        AppointmentDetails: {
          Service: {
            Id: null,
          },
          Reason: null,
          SubTotal: null,
        },
      },

      selectedSlot: [false, false, false, false, false, false],
    };
  },
  watch: {
    selectDocs: function () {
      if (this.selectDocs && this.date) {
        this.checkDoctorSchedule(this.selectDocs.id, this.date);
      }
    },
    date: function () {
      if (this.selectDocs && this.date) {
        this.checkDoctorSchedule(this.selectDocs.id, this.date);
      }
    },
  },
  async created() {
    this.getAllServices();
    this.getAllDocs();
    this.createSlot();
    this.checkSlot();
  },
  methods: {
    async getAllServices() {
      this.loading = true;
      // eslint-disable-next-line no-unused-vars
      HTTP.get("Services")
        .then((response) => {
          this.services = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
      this.loading = false;
    },
    async getAllDocs() {
      this.loading = true;
      await HTTP.get("Doctor/GetAllDoctor")
        .then((response) => {
          this.doctors = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
      this.loading = false;
    },
    createSlot() {
      const slotTimes = [
        [8, 0], // Slot 1
        [9, 30], // Slot 2
        [11, 0], // Slot 3
        [14, 0], // Slot 4
        [15, 30], // Slot 5
        [17, 0], // Slot 6
      ];

      for (let i = 0; i < slotTimes.length; i++) {
        const [hours, minutes] = slotTimes[i];
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        this["slot" + (i + 1)] = date;
      }
    },
    // checkSlot() {
    //   const slotTimes = [
    //     this.slot1,
    //     this.slot2,
    //     this.slot3,
    //     this.slot4,
    //     this.slot5,
    //     this.slot6,
    //   ];
    //   const results = slotTimes.map((slotTime) => {
    //     const slotHour = slotTime.getHours();
    //     for (let i = 0; i < this.schedules.length; i++) {
    //       const scheduleHour = new Date(this.schedules[i].start).getHours();

    //       if (slotHour === scheduleHour) {
    //         return true;
    //       }
    //     }
    //     return false;
    //   });
    //   this.disabledButtons = results;
    //   return results;
    // },
    checkSlot() {
      const slotTimes = [
        this.slot1,
        this.slot2,
        this.slot3,
        this.slot4,
        this.slot5,
        this.slot6,
      ];
      const results = slotTimes.map((slotTime, index) => {
        // include index for tracking selectedSlot
        const slotHour = slotTime.getHours();
        for (let i = 0; i < this.schedules.length; i++) {
          const scheduleHour = new Date(this.schedules[i].start).getHours();
          if (slotHour === scheduleHour) {
            if (this.selectedSlot === index) {
              this.selectedSlot = null; // reset selectedSlot if checkbox is disabled
            }
            return true;
          }
        }
        if (this.disabledButtons[index]) {
          if (this.selectedSlot === index) {
            this.selectedSlot = null; // reset selectedSlot if checkbox is disabled
          }
          return true;
        }
        return false;
      });
      this.disabledButtons = results;
      if (this.selectedSlot === null) {
        // select the first available slot if none is selected
        this.selectedSlot = results.indexOf(false);
      }
      return results;
    },

    checkDoctorSchedule(doc, date) {
      const docId = doc;
      const formattedDate = this.dateToYMD(date);
      console.log(docId);
      console.log("date", formattedDate);
      HTTP.get(
        `ReservedSchedules/GetDocScheduleByDate/${docId}/${formattedDate}`
      )
        .then((res) => {
          this.schedules = res.data;
          this.checkSlot();
          this.showSuccess();
        })
        .catch((err) => {
          console.log(err);
          this.disabledButtons = [false, false, false, false, false, false];
          this.showSuccess();
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
    showSuccess() {
      this.$toast.add({
        severity: "success",
        summary: "Success Message",
        detail: "Message Content",
        life: 3000,
      });
    },
  },
};
</script>
<style scoped>
.p-multiselect {
  width: 35rem;
}
.p-fieldset-legend {
  color: #840e07;
}
.fieldset p {
  line-height: 1.5;
  margin: 0;
}
.container {
  font-weight: 400;
}
.intro-title {
  color: #840e07;
}
.intro-content li span {
  color: red;
}
.card {
  background-color: #fecccc;
}
.submit-button {
  background-color: #ca574f;
  border-radius: 100px;
  height: 40px;
  align-items: center;
}
input {
  border-radius: 100px;
}
input::placeholder {
  color: #000;
}
textarea {
  border-radius: 15px;
}
</style>
<style>
.p-dropdown.p-component.p-inputwrapper.p-inputwrapper-filled {
  width: 135%;
}
.p-fieldset .p-fieldset-legend {
  background-color: #cb5850;
}
.p-fieldset {
  background-color: #fecccc;
}

.cat {
  margin: 4px;
  background-color: #3b82f6;
  border-radius: 4px;
  border: 1px solid #fff;
  overflow: hidden;
  float: left;
}
.cat label {
  float: left;
  line-height: 3em;
  width: 10em;
  height: 3em;
}
.cat label span {
  text-align: center;
  display: block;
}
.cat label input {
  position: absolute;
  display: none;
  color: #fff !important;
}
.cat label input + span {
  color: #fff;
}
.cat input:checked + span {
  color: #ffffff;
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.8);
}
.action input:checked + span {
  background-color: blue;
}
.cantChoose {
  background-color: gray;
  pointer-events: none;
}
</style>
