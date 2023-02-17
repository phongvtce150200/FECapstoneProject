<template>
  <div>
    <Button
      label="Adding Doctor"
      class="p-button-rounded p-button-success mb-3"
    />
  </div>
  <div>
    <DataTable
      :value="doctors"
      :paginator="true"
      :rows="10"
      :rowHover="true"
      :loading="loading"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[10, 25, 50]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
      responsiveLayout="scroll"
      v-model:filters="filters"
      filterDisplay="menu"
      :globalFilterFields="['fullName']"
    >
      <template #header>
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="m-0">Doctor Manage</h5>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              placeholder="Keyword Search"
              v-model="filters['fullName'].value"
            />
          </span>
        </div>
      </template>
      <template #empty> No project found. </template>
      <template #loading>
        <ProgressSpinner />
      </template>
      <div>
        <Column field="id" header="Doctor Id">
          <template #body="{ data }">
            {{ data.user.id }}
          </template>
        </Column>
        <Column field="fullName" header="Full Name">
          <template #body="{ data }"> {{ data.user.fullName }} </template>
        </Column>
        <Column field="gender" header="Gender">
          <template #body="{ data }">
            {{ data.user.gender }}
          </template>
        </Column>
        <Column field="birthDay" header="BirthDay">
          <template #body="{ data }">
            {{ dateToYMD(data.user.birthDay) }}
          </template>
        </Column>
        <Column field="email" header="Email">
          <template #body="{ data }"> {{ data.user.email }}</template>
        </Column>
        <Column field="country" header="Country">
          <template #body="{ data }"> {{ data.user.address }}</template>
        </Column>
        <Column field="phone" header="Phone Number">
          <template #body="{ data }"> {{ data.user.phoneNumber }}</template>
        </Column>
        <Column field="experience" header="Experience">
          <template #body="{ data }"> {{ data.experience + " Year" }}</template>
        </Column>
        <Column field="qualification" header="Qualification">
          <template #body="{ data }">
            <Button label="More" @click="alo(data)"
          /></template>
        </Column>
      </div>
    </DataTable>
  </div>
  <Dialog
    header="Header"
    v-model:visible="displayBasic"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw' }"
  >
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
  </Dialog>
</template>
<script>
import axios from "axios";
import { FilterMatchMode } from "primevue/api";
export default {
  data() {
    return {
      doctors: [],
      loading: false,
      displayBasic: false,
      filters: {
        fullName: {
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
      },
    };
  },
  created() {
    this.getAllDoctor();
  },
  methods: {
    async getAllDoctor() {
      this.loading = true;
      // eslint-disable-next-line no-unused-vars
      const respone = await axios
        .get("Doctor/GetAllDoctor")
        .then((response) => {
          this.doctors = response.data.data;
          console.log(this.doctors);
        })
        .catch((error) => {
          console.log(error);
        });
      this.loading = false;
    },
    alo() {
      this.displayBasic = true;
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
