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
      <Fieldset legend="Make appointment">
        <div
          class="container mt-3"
          style="display: flex; justify-content: center"
        >
          <div class="d-flex flex-column">
            <div class="p-2">
              <div class="d-flex flex-row">
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
                      v-model="date12"
                      placeholder="Please pick a day"
                    >
                      <template #date="slotProps">
                        <strong
                          v-if="
                            slotProps.date.day > 10 && slotProps.date.day < 15
                          "
                          class="special-day"
                          >{{ slotProps.date.day }}</strong
                        >
                        <template v-else>{{ slotProps.date.day }}</template>
                      </template>
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
                  <div class="col-sm-4">
                    <Button
                      label="Slot 1"
                      class="w-100"
                      v-model="slot1"
                      :disabled="disabledButtons[0]"
                    />
                  </div>
                  <div class="col-sm-4">
                    <Button
                      label="Slot 2"
                      class="w-100"
                      v-model="slot2"
                      :disabled="disabledButtons[1]"
                    />
                  </div>
                  <div class="col-sm-4">
                    <Button
                      label="Slot 3"
                      class="w-100"
                      v-model="slot3"
                      :disabled="disabledButtons[2]"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-4">
                    <Button
                      label="Slot 4"
                      class="w-100"
                      v-model="slot4"
                      :disabled="disabledButtons[3]"
                    />
                  </div>
                  <div class="col-sm-4">
                    <Button
                      label="Slot 5"
                      class="w-100"
                      v-model="slot5"
                      :disabled="disabledButtons[4]"
                    />
                  </div>
                  <div class="col-sm-4">
                    <Button
                      label="Slot 6"
                      class="w-100"
                      v-model="slot6"
                      :disabled="disabledButtons[5]"
                    />
                  </div>
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
      date12: null,
      selectServices: null,
      services: [],
      doctors: [],
      schedules: [],
      disabledButtons: [],
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
      slot1: "",
      slot2: "",
      slot3: "",
      slot4: "",
      slot5: "",
      slot6: "",
    };
  },
  async created() {
    this.getAllServices();
    this.getAllDocs();
    await this.getDocApms();
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
    async getDocApms() {
      this.loading = true;
      await HTTP.get(
        `ReservedSchedules/GetDocScheduleByDate?DocId=1&date=3%2F8%2F2022`
      )
        .then((response) => {
          this.schedules = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
      this.loading = false;
    },
    createSlot() {
      // const date1 = new Date();
      // date1.setHours(8, 0, 0, 0);
      // this.slot1 = date1;

      // const date2 = new Date();
      // date2.setHours(9, 30, 0, 0);
      // this.slot2 = date2;

      // const date3 = new Date();
      // date3.setHours(11, 0, 0, 0);
      // this.slot3 = date3;

      // const date4 = new Date();
      // date4.setHours(14, 0, 0, 0);
      // this.slot4 = date4;

      // const date5 = new Date();
      // date5.setHours(15, 30, 0, 0);
      // this.slot5 = date5;

      // const date6 = new Date();
      // date6.setHours(17, 0, 0, 0);
      // this.slot6 = date6;

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
    checkSlot() {
      const slotTimes = [
        this.slot1,
        this.slot2,
        this.slot3,
        this.slot4,
        this.slot5,
        this.slot6,
      ];
      const results = slotTimes.map((slotTime) => {
        const slotHour = slotTime.getHours();
        console.log("this is slot hour: ", slotHour);
        for (let i = 0; i < this.schedules.length; i++) {
          const scheduleHour = new Date(this.schedules[i].start).getHours();
          console.log("this is schedule", i, "hour: ", scheduleHour);

          if (slotHour === scheduleHour) {
            return true;
          }
        }
        return false;
      });
      this.disabledButtons = results;
      console.log(this.disabledButtons);
      return results;
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
