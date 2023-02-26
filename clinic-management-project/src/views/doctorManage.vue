<template>
  <div>
    <Button
      label="Adding Doctor"
      class="p-button-rounded p-button-success mb-3"
      @click="openCreateDoctor()"
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
        <Column field="experience" header="Experience">
          <template #body="{ data }"> {{ data.experience + " Year" }}</template>
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
                @click="DeleteDoctor(data.id)"
              />
              <Button
                label="Restore"
                class="p-button-raised"
                @click="RestoreDoctor(data.id)"
              />
            </div>
          </template>
        </Column>
      </div>
    </DataTable>
  </div>
  <Dialog
    :header="
      selectedUser != null ? 'Edit Doctor Information' : 'Adding New Doctor'
    "
    v-model:visible="openCreateDoctorModal"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw' }"
    :modal="true"
  >
    <div class="p-inputgroup">
      <span class="p-inputgroup-addon">
        <i class="fa-solid fa-pen"></i>
      </span>
      <InputText placeholder="Doctor Firstname" v-model="user.firstName" />
    </div>
    <div class="p-inputgroup">
      <span class="p-inputgroup-addon">
        <i class="fa-solid fa-pen"></i>
      </span>
      <InputText placeholder="Doctor Lastname" v-model="user.lastName" />
    </div>
    <div class="p-inputgroup">
      <span class="p-inputgroup-addon">
        <i class="fa-solid fa-pen"></i>
      </span>
      <InputText placeholder="Doctor Account" v-model="user.username" />
    </div>
    <div class="p-inputgroup">
      <span class="p-inputgroup-addon">
        <i class="fa-solid fa-pen"></i>
      </span>
      <InputText
        placeholder="Doctor Password"
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
      <InputText placeholder="Doctor Email" v-model="user.email" />
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
    <div class="p-inputgroup">
      <span class="p-inputgroup-addon">
        <i class="fa-solid fa-globe"></i>
      </span>
      <InputNumber
        prefix="Experience in "
        suffix=" Year"
        placeholder="Experience in ... Year"
        v-model="user.doctor.experience"
      />
    </div>
    <template #footer>
      <Button
        label="No"
        icon="pi pi-times"
        @click="closeModal()"
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
import { FilterMatchMode } from "primevue/api";
export default {
  data() {
    return {
      doctors: [],
      loading: false,
      openCreateDoctorModal: false,
      filters: {
        fullName: {
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
      },
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
        doctor: {
          experience: "",
          qualification: "",
        },
      },
      selectedUser: null,
    };
  },
  created() {
    this.getAllDoctor();
  },
  beforeUpdate() {
    if (this.selectedUser != null) {
      this.user.firstName = this.selectedUser.user.firstName;
      this.user.lastName = this.selectedUser.user.lastName;
      this.user.username = this.selectedUser.user.username;
      this.user.password = this.selectedUser.user.password;
      this.user.email = this.selectedUser.user.email;
      this.user.gender = this.selectedUser.user.gender;
      this.user.birthDay = this.selectedUser.user.birthDay;
      this.user.address = this.selectedUser.user.address;
      this.user.phoneNumber = this.selectedUser.user.phoneNumber;
      this.user.doctor.experience = this.selectedUser.user.experience;
    }
  },
  methods: {
    async getAllDoctor() {
      this.loading = true;
      HTTP.get("Doctor/GetAllDoctor")
        .then((response) => {
          this.doctors = response.data;
          console.log(this.doctors);
        })
        .catch((error) => {
          console.log(error);
        });
      this.loading = false;
    },
    async CreateDoctor() {
      HTTP.post("Doctor", this.user)
        .then((res) => {
          console.log(res);
          this.$toast.add({
            severity: "success",
            summary: "Success Message",
            detail: "Message Content",
            life: 3000,
          });
          this.closeModal();
          this.getAllDoctor();
        })
        .then((error) => {
          console.log(error);
          this.$toast.add({
            severity: "warn",
            summary: "Warn Message",
            detail: "Message Content",
            life: 3000,
          });
        });
    },
    async DeleteDoctor(id) {
      this.$confirm.require({
        message: "Do you want to delete this record?",
        header: "Delete Confirmation",
        icon: "pi pi-info-circle",
        acceptClass: "p-button-danger",
        accept: async () => {
          HTTP.put("Doctor/DeleteDoctor?DoctorId=" + id)
            .then((res) => {
              console.log(res);
              this.$toast.add({
                severity: "info",
                summary: "Confirmed",
                detail: "Record deleted",
                life: 3000,
              });
              this.getAllDoctor();
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
    async RestoreDoctor(id) {
      this.$confirm.require({
        message: "Do you want to restore this record?",
        header: "Restore Confirmation",
        icon: "pi pi-info-circle",
        acceptClass: "p-button-success",
        accept: async () => {
          HTTP.put("Doctor/RestoreDoctor?DoctorId=" + id)
            .then((res) => {
              console.log(res);
              this.$toast.add({
                severity: "info",
                summary: "Confirmed",
                detail: "Record deleted",
                life: 3000,
              });
              this.getAllDoctor();
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
    // async EditDoctor(id) {
    //   HTTP.put("Doctor/" + id, this.selectedUser)
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .then((error) => {
    //       console.log(error);
    //     });
    // },
    openCreateDoctor() {
      this.openCreateDoctorModal = true;
    },
    openEditDoctor(data) {
      this.openCreateDoctorModal = true;
      this.selectedUser = { ...data };
      console.log(this.selectedUser);
    },
    closeModal() {
      this.openCreateDoctorModal = false;
      this.clearform();
    },
    clearform() {
      this.selectedUser = null;
      this.user = {
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
        gender: "",
        birthDay: "",
        address: "",
        phoneNumber: "",
        doctor: {
          experience: "",
          qualification: "",
        },
      };
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
    handleSubmit() {
      if (this.selectedUser == null) this.CreateDoctor();
      else this.EditDoctor();
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
