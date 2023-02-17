<template>
  <div>
    <button
      class="btn btn-success"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      Create new Medicine
    </button>
  </div>

  <hr />
  <div>
    <table class="table table-hover text-center" id="example">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Patient Id</th>
          <th scope="col">Full Name</th>
          <th scope="col">Gender</th>
          <th scope="col">Birthday</th>
          <th scope="col">Email</th>
          <th scope="col">Address</th>
          <th scope="col">Phone Number</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody id="medicineBody">
        <tr v-for="(item, index) in patients" :key="index">
          <td>{{ ++index }}</td>
          <td>{{ item.id }}</td>
          <td>{{ item.user.fullName }}</td>
          <td>{{ item.user.gender }}</td>
          <td>{{ dateToYMD(item.user.birthDay) }}</td>
          <td>{{ item.user.email }}</td>
          <td>{{ item.user.address }}</td>
          <td>{{ item.user.phoneNumber }}</td>
          <td>
            <button
              class="btn btn-warning me-2"
              data-bs-toggle="modal"
              data-bs-target="#EditexampleModal"
              name="test"
            >
              Edit
            </button>
            <button
              class="btn btn-danger"
              data-bs-toggle="modal"
              data-bs-target="#DeleteexampleModal"
              name="delete"
            >
              Delete
            </button>
            <input type="hidden" asp-for="@item.medicineId" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      patients: [],
    };
  },
  created() {
    this.getAllPatient();
  },
  methods: {
    async getAllPatient() {
      // eslint-disable-next-line no-unused-vars
      const respone = await axios
        .get("Patient/GetAllPatient")
        .then((response) => {
          this.patients = response.data.data;
          console.log(this.patients);
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
  },
};
</script>
