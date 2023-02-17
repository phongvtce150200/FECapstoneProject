<template>
  <div>
    <Button
      label="Adding Nurse"
      class="p-button-rounded p-button-success mb-3"
    />
  </div>

  <div>
    <DataTable
      :value="nurses"
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
          <h5 class="m-0">Nurse Manage</h5>
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
</template>
<script>
import axios from "axios";
import { FilterMatchMode } from "primevue/api";
export default {
  data() {
    return {
      nurses: [],
      filters: {
        fullName: {
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
      },
    };
  },
  created() {
    this.getAllNurse();
  },
  methods: {
    async getAllNurse() {
      // eslint-disable-next-line no-unused-vars
      const respone = await axios
        .get("Nurse/GetAllNurse")
        .then((response) => {
          this.nurses = response.data.data;
          console.log(this.nurses);
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
