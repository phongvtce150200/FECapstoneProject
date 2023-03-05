<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="vertical-nav bg-white"
    id="sidebar"
    :class="{ active: isActive == true }"
  >
    <div class="py-4 px-3 mb-4 bg-light">
      <div class="align-items-center">
        <img src="../assets/image/VTP2_1.svg" height="80" width="200" />
      </div>
    </div>

    <p class="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0">
      Main
    </p>

    <ul class="nav flex-column bg-white mb-0">
      <li class="nav-item">
        <a href="#" class="nav-link text-dark font-italic bg-light">
          <i class="fa fa-th-large mr-3 text-primary fa-fw"></i>
          Home
        </a>
      </li>
      <li class="nav-item">
        <router-link
          :to="{ name: 'Dashboard', params: {} }"
          class="nav-link text-dark font-italic"
        >
          <i class="fa-solid fa-gauge"></i>
          Dashboard
        </router-link>
      </li>
      <div v-if="role === 'Admin'">
        <li class="nav-item">
          <router-link
            :to="{ name: 'Medicine', params: {} }"
            class="nav-link text-dark font-italic"
          >
            <i class="fa-solid fa-hand-holding-medical"></i>
            Medicine Manage
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            :to="{ name: 'Patient', params: {} }"
            class="nav-link text-dark font-italic"
          >
            <i class="fa-solid fa-bed-pulse"></i>
            Patient Manage
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            :to="{ name: 'Doctor', params: {} }"
            class="nav-link text-dark font-italic"
          >
            <i class="fa-solid fa-bed-pulse"></i>
            Doctor Manage
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            :to="{ name: 'Nurse', params: {} }"
            class="nav-link text-dark font-italic"
          >
            <i class="fa-solid fa-bed-pulse"></i>
            Nurse Manage
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            :to="{ name: 'Service', params: {} }"
            class="nav-link text-dark font-italic"
          >
            <i class="fa-solid fa-bed-pulse"></i>
            Service Manage
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            :to="{ name: 'Invoice', params: {} }"
            class="nav-link text-dark font-italic"
          >
            <i class="fa-solid fa-bed-pulse"></i>
            Invoice Manage
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            :to="{ name: 'Test', params: {} }"
            class="nav-link text-dark font-italic"
          >
            <i class="fa-solid fa-bed-pulse"></i>
            Test Manage
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            :to="{ name: 'Prescription', params: {} }"
            class="nav-link text-dark font-italic"
          >
            <i class="fa-solid fa-bed-pulse"></i>
            Prescription Manage
          </router-link>
        </li>
      </div>
      <div v-else-if="role === 'Doctor'">
        <li class="nav-item">
          <router-link
            :to="{ name: 'MedicalExam', params: {} }"
            class="nav-link text-dark font-italic"
          >
            <i class="fa-solid fa-stethoscope"></i>
            Medical Exam
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            :to="{ name: 'DoctorAppointment', params: {} }"
            class="nav-link text-dark font-italic"
          >
            <i class="fa-solid fa-bed-pulse"></i>
            Appointment
          </router-link>
        </li>
      </div>
      <div v-else>
        <li class="nav-item">
          <router-link
            :to="{ name: 'ReceivePatient', params: {} }"
            class="nav-link text-dark font-italic"
          >
            <i class="fa-solid fa-hand-holding-medical"></i>
            Receive Patient
          </router-link>
        </li>
      </div>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      role: localStorage.getItem("role"),
    };
  },
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    open() {
      this.$emit("open", this.isActive);
    },
  },
};
</script>
