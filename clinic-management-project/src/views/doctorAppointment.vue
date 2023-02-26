<template>
  <FullCalendar :options="calendarOptions" />
</template>
<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { HTTP } from "@/axios";
export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  data() {
    return {
      appointments: [],
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        dateClick: this.handleDateClick,
        events: [
          {
            title: "event 1",
            start: "2023-02-22T10:30:00",
            end: "2023-02-22T11:30:00",
          },
          {
            title: "event 2",
            start: "2023-02-22T13:30:00",
            end: "2017-02-22T14:30:00",
          },
        ],
      },
    };
  },
  created() {
    this.getAllApointment();
  },
  methods: {
    handleDateClick: function (arg) {
      alert("date click! " + arg.dateStr);
    },
    getAllApointment() {
      HTTP.get("ReservedSchedules/DocId/" + localStorage.getItem("DoctorId"))
        .then((res) => {
          this.appointments = res.data;
          console.log(this.appointments);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
