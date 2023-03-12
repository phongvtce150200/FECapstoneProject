<template>
  <div>
    <Button
      label="Adding Patient"
      class="p-button-rounded p-button-success mb-3"
      @click="openPatientDialog()"
    />
  </div>
  <div>
    <DataTable
      :value="patients"
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
          <h5 class="m-0">Patient Manage</h5>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText placeholder="Keyword Search" />
          </span>
        </div>
      </template>
      <template #empty> No project found. </template>
      <template #loading>
        <ProgressSpinner />
      </template>
      <div>
        <Column field="#" header="#">
          <template #body="{ index }">
            {{ ++index }}
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
        <Column field="actions" header="Actions">
          <template #body="{ data }">
            <div class="d-flex">
              <!-- <Button
                label="Edit"
                class="p-button-raised p-button-warning me-2"
                @click="openEditDoctor(data)"
              /> -->
              <Button
                label="Delete"
                class="p-button-raised p-button-danger me-2"
                :class="{ disable: data.user.isDelete === true }"
                @click="DeletePatient(data.id)"
              />
              <Button
                label="Restore"
                class="p-button-raised"
                :class="{ disable: data.user.isDelete === false }"
                @click="RestorePatient(data.id)"
              />
            </div>
          </template>
        </Column>
      </div>
    </DataTable>
  </div>
  <Dialog
    :header="
      selectedUser != null ? 'Edit Nurse Information' : 'Adding New Nurse'
    "
    v-model:visible="displayPatientDialog"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw' }"
    :modal="true"
  >
    <div class="p-inputgroup">
      <span class="p-inputgroup-addon">
        <i class="fa-solid fa-pen"></i>
      </span>
      <InputText placeholder="Firstname" v-model="user.firstName" />
    </div>
    <div class="p-inputgroup">
      <span class="p-inputgroup-addon">
        <i class="fa-solid fa-pen"></i>
      </span>
      <InputText placeholder="Lastname" v-model="user.lastName" />
    </div>
    <div class="p-inputgroup">
      <span class="p-inputgroup-addon">
        <i class="fa-solid fa-pen"></i>
      </span>
      <InputText placeholder="Account" v-model="user.username" />
    </div>
    <div class="p-inputgroup">
      <span class="p-inputgroup-addon">
        <i class="fa-solid fa-pen"></i>
      </span>
      <InputText
        placeholder="Password"
        type="password"
        v-model="user.password"
      />
    </div>
    <div class="p-inputgroup">
      <span class="p-inputgroup-addon">
        <i class="fa-solid fa-transgender"></i>
      </span>
      <Dropdown
        optionLabel="name"
        optionValue="code"
        placeholder="Select Gender"
        :options="selectGender"
        option-label="name"
        :editable="true"
        v-model="user.gender"
      />
    </div>
    <div class="p-inputgroup">
      <span class="p-inputgroup-addon">
        <i class="fa-solid fa-cake-candles"></i>
      </span>
      <Calendar
        dateFormat="mm-dd-yy"
        placeholder="Birthday"
        v-model="user.birthDay"
      />
    </div>
    <div class="p-inputgroup">
      <span class="p-inputgroup-addon">
        <i class="fa-solid fa-envelope"></i>
      </span>
      <InputText placeholder="Email" v-model="user.email" />
    </div>
    <div class="p-inputgroup">
      <span class="p-inputgroup-addon">
        <i class="fa-solid fa-globe"></i>
      </span>
      <InputText placeholder="Country" v-model="user.address" />
    </div>
    <div class="p-inputgroup">
      <span class="p-inputgroup-addon">
        <i class="fa-solid fa-globe"></i>
      </span>
      <InputText
        placeholder="Phone Number"
        type="phoneNumber"
        v-model="user.phoneNumber"
      />
    </div>
    <template #footer>
      <Button
        label="No"
        icon="pi pi-times"
        @click="closePatientDialog()"
        class="p-button-text"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        @click="handleSubmit()"
        autofocus
      />
    </template>
  </Dialog>
  <ConfirmDialog></ConfirmDialog>
  <Toast />
</template>
<script>
import { HTTP } from "@/axios";
export default {
  data() {
    return {
      patients: [],
      displayPatientDialog: false,
      selectGender: [
        { name: "Female", code: "0" },
        { name: "Male", code: "1" },
        { name: "Undefine", code: "3" },
      ],
      user: {
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
        gender: "",
        birthDay: "",
        address: "",
        phoneNumber: "",
      },
      selectedUser: null,
    };
  },
  created() {
    this.getAllPatient();
  },
  methods: {
    async getAllPatient() {
      // eslint-disable-next-line no-unused-vars
      HTTP.get("Patient/GetAllPatient")
        .then((response) => {
          this.patients = response.data;
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
    openPatientDialog() {
      this.displayPatientDialog = true;
    },
    closePatientDialog() {
      this.displayPatientDialog = false;
    },
    async createPatient() {
      HTTP.post("Authentication/Register", this.user)
        .then((res) => {
          console.log(res);
          this.$toast.add({
            severity: "success",
            summary: "Confirmed",
            detail: "Record deleted",
            life: 3000,
          });
          this.closePatientDialog();
          this.getAllPatient();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleSubmit() {
      this.createPatient();
    },
    async DeletePatient(id) {
      this.$confirm.require({
        message: "Do you want to delete this record?",
        header: "Delete Confirmation",
        icon: "pi pi-info-circle",
        acceptClass: "p-button-danger",
        accept: async () => {
          HTTP.put("Patient/DeletePut?id=" + id)
            .then((res) => {
              console.log(res);
              this.$toast.add({
                severity: "success",
                summary: "Confirmed",
                detail: "Record deleted",
                life: 3000,
              });
              this.closePatientDialog();
              this.getAllPatient();
            })
            .catch((error) => {
              console.log(error);
              this.$toast.add({
                severity: "warn",
                summary: "Warn Message",
                detail: "Message Content",
                life: 3000,
              });
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
    RestorePatient(id) {
      this.$confirm.require({
        message: "Do you want to restore this record?",
        header: "Restore Confirmation",
        icon: "pi pi-info-circle",
        acceptClass: "p-button-success",
        accept: async () => {
          HTTP.put("Patient/RestorePatient?id=" + id)
            .then((res) => {
              console.log(res);
              this.$toast.add({
                severity: "success",
                summary: "Confirmed",
                detail: "Record deleted",
                life: 3000,
              });
              this.getAllPatient();
            })
            .catch((err) => {
              console.log(err);
              this.$toast.add({
                severity: "warn",
                summary: "Warn Message",
                detail: "Message Content",
                life: 3000,
              });
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
  },
};
</script>
<style scoped>
.disable {
  pointer-events: none;
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}
</style>
