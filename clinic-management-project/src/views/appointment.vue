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
                  <div class="checkbox-grid">
                    <label
                      v-for="(option, index) in options"
                      :key="index"
                      :class="{
                        'checkbox-button': true,
                        checked: selected.includes(option),
                        cantChoose: disabledButtons[index] === true,
                      }"
                      @click="checkOne(option)"
                    >
                      <input
                        type="checkbox"
                        :value="option"
                        v-model="selected"
                        @change="checkOne(option)"
                        :class="{
                          cantChoose: disabledButtons[index] === true,
                        }"
                      />
                      <span class="button-label">{{ option.label }}</span>
                    </label>
                  </div>
                </div>
              </div>
              <span>Reason</span>
              <div class="d-flex justify-content-around mb-3">
                <div>
                  <Textarea
                    v-model="Reason"
                    :autoResize="false"
                    rows="15"
                    cols="70"
                    placeholder="Enter your medical condition, questions for the doctor and health problems to see"
                  />
                </div>
              </div>
              <!-- <a
                href="#"
                class="submit-button d-flex justify-content-center"
                style="text-decoration: none"
              >
                <span class="text-white text-decoration-none">Submit</span>
              </a> -->
              <Button
                label="Create"
                class="p-button-raised p-button-primary"
                @click="createAppointment()"
              ></Button>
            </div>
          </div>
        </div>
      </Fieldset>
    </div>
  </div>
</template>
<script>
import { HTTP } from "@/axios";
//import { get } from "http";

export default {
  data() {
    const options = [
      "8:00 AM",
      "9:30 AM",
      "11:00 AM",
      "1:30 PM",
      "2:00 PM",
      "5:00 PM",
    ];

    const dateOptions = options.map((option, index) => {
      const [time, period] = option.split(" ");
      const [hours, minutes] = time.split(":");
      const date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes);
      date.setSeconds(0);
      date.setMilliseconds(0);

      if (period === "PM" && hours !== "12") {
        date.setHours(date.getHours() + 12);
      }

      return {
        value: date,
        label: `Slot ${index + 1}`,
      };
    });
    return {
      date: null,
      selectServices: [],
      services: [],
      doctors: [],
      schedules: [],
      disabledButtons: [false, false, false, false, false, false],
      selectDocs: null,
      appointment: {
        DoctorId: null,
        PatientId: localStorage.getItem("PatientId"),
        AppointmentDate: null,
        SubTotal: null,
        AppointmentDetails: null,
      },
      Reason: null,
      Service: [],
      selectedSlot: [],

      options: dateOptions,
      selected: [],
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
    async checkSlot() {
      const results = await this.options.map((val, index) => {
        // include index for tracking selectedSlot
        const slotHour = val.value.getHours();
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
      console.log(results);
      return results;
    },

    checkDoctorSchedule(doc, date) {
      this.selected = [];
      this.disabledButtons = [];
      const docId = doc;
      const formattedDate = this.dateToYMD(date);
      console.log("date", formattedDate);
      HTTP.get(
        `ReservedSchedules/GetDocScheduleByDate/${docId}/${formattedDate}`
      )
        .then((res) => {
          this.schedules = res.data;
          console.log(this.schedules);
          this.checkSlot();
          this.showSuccess();
        })
        .catch((err) => {
          console.log(err);
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
    async checkOne(option) {
      console.log(option.value.getHours());
      this.selected = [option]; // assign the selected option to the option parameter
      console.log(this.selected[0].value);
      const hours = this.selected[0].value
        .getHours()
        .toString()
        .padStart(2, "0");
      const minutes = this.selected[0].value
        .getMinutes()
        .toString()
        .padStart(2, "0");
      const seconds = this.selected[0].value
        .getSeconds()
        .toString()
        .padStart(2, "0");
      const time = `${hours}:${minutes}:${seconds}`;
      console.log(time);
    },
    createAppointment() {
      this.appointment.DoctorId = this.selectDocs.id;
      this.appointment.AppointmentDate = this.date;
      const serviceId = this.selectServices.map((svId) => svId.id);
      this.appointment.AppointmentDetails = { ...serviceId };
      this.appointment.AppointmentDetails.Reason = this.Reason;
      this.appointment.SubTotal = 0;
      for (let i = 0; i < serviceId.length; i++) {
        if (serviceId[i] !== 0) {
          HTTP.get(`Services/` + serviceId[i]).then((res) => {
            this.appointment.SubTotal += res.data.servicePrice;
          });
        }
      }
      console.log(this.appointment);
      HTTP.post("Appointment", this.appointment)
        .then((res) => {
          console.log(res);
          this.$toast.add({
            severity: "success",
            summary: "Success Message",
            detail: "Message Content",
            life: 3000,
          });
        })
        .catch((err) => {
          console.log(err);
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
.cantChoose {
  background-color: gray !important;
  pointer-events: none;
}
.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
}

.checkbox-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0d6efd;
  color: #fff;
  border: none;
  border-radius: 10px;
  height: 50px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.checkbox-button:hover {
  background-color: #0b5ed7;
}

.checkbox-button input[type="checkbox"] {
  opacity: 0;
  position: absolute;
  cursor: pointer;
}

.checkbox-button.checked {
  background-color: #198754;
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
</style>
