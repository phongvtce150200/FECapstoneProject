<template>
  <div>
    <Button
      label="Adding Medicine"
      class="p-button-rounded p-button-success mb-3"
      @click="openCreateMedicine()"
    />
  </div>
  <div>
    <DataTable
      :value="medicines"
      :paginator="true"
      :rows="5"
      :rowHover="true"
      :loading="loading"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
      responsiveLayout="scroll"
      v-model:filters="filters"
      filterDisplay="menu"
      :globalFilterFields="['medicineName']"
    >
      <template #header>
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="m-0">Medicine Manage</h5>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              placeholder="Keyword Search"
              v-model="filters['medicineName'].value"
            />
          </span>
        </div>
      </template>
      <template #empty> No project found. </template>
      <template #loading>
        <ProgressSpinner />
      </template>
      <div>
        <Column field="medicineName" header="Medicine Name">
          <template #body="{ data }">
            {{ data.medicineName }}
          </template>
        </Column>
        <Column field="price" header="Price">
          <template #body="{ data }"> {{ data.price }} </template>
        </Column>
        <Column field="expiration" header="Expiration">
          <template #body="{ data }">
            {{ data.expiration }}
          </template>
        </Column>
        <Column field="amount" header="Amount">
          <template #body="{ data }">
            {{ data.amount }}
          </template>
        </Column>
        <Column field="description" header="Description">
          <template #body="{ data }">
            {{ data.description }}
          </template>
        </Column>
        <Column field="actions" header="Actions">
          <template #body="{ data }">
            <Button
              label="Edit"
              class="p-button-raised p-button-warning me-2"
              @click="openEditMedicine(data)"
            />
            <Button
              label="Delete"
              class="p-button-raised p-button-danger me-2"
              :class="{ disable: data.isDelete === true }"
              @click="deleteMedidcine(data.id)"
            />
            <Button
              label="Restore"
              class="p-button-raised"
              @click="restoreMedicine(data.id)"
            />
          </template>
        </Column>
      </div>
    </DataTable>
  </div>
  <Dialog
    :header="selectedMedicine != null ? 'Edit Medicine' : 'Adding New Medicine'"
    v-model:visible="displayMedicineModal"
    :closable="false"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw' }"
    :modal="true"
  >
    <div class="d-flex">
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <i class="fa-sharp fa-solid fa-capsules"></i>
        </span>
        <InputText
          placeholder="Medicine Name"
          v-model="medicineModel.medicineName"
        />
      </div>
      <div class="ms-3">
        <Calendar
          inputId="icon"
          v-model="medicineModel.expirationDate"
          :showIcon="true"
          placeholder="Expiration"
        />
      </div>
    </div>
    <div class="d-flex justify-content-between mt-3">
      <div class="p-inputgroup me-3">
        <span class="p-inputgroup-addon">
          <i>$</i>
        </span>
        <InputText placeholder="Price" v-model="medicineModel.price" />
      </div>
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <i class="fa-regular fa-hashtag"></i>
        </span>
        <InputText placeholder="Amount" v-model="medicineModel.amount" />
      </div>
    </div>
    <div class="mt-3">
      <Textarea
        v-model="medicineModel.description"
        :autoResize="true"
        rows="5"
        cols="104"
        placeholder="Description"
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
      medicines: [],
      loading: false,
      displayMedicineModal: false,
      // resultPage: {
      //   pageSize: null,
      //   pageNumber: null,
      // },
      selectedMedicine: null,
      filters: {
        medicineName: {
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
      },
      medicineModel: {
        id: "",
        medicineName: "",
        amount: "",
        price: "",
        expirationDate: "",
        description: "",
      },
    };
  },
  created() {
    this.getAllMedicine();
  },
  beforeUpdate() {
    if (this.selectedMedicine != null) {
      this.medicineModel.id = this.selectedMedicine.id;
      this.medicineModel.medicineName = this.selectedMedicine.medicineName;
      this.medicineModel.amount = this.selectedMedicine.amount;
      this.medicineModel.description = this.selectedMedicine.description;
      this.medicineModel.price = this.selectedMedicine.price;
      this.medicineModel.expirationDate = this.selectedMedicine.expiration;
    }
  },
  methods: {
    async getAllMedicine() {
      this.loading = true;
      // eslint-disable-next-line no-unused-vars
      HTTP.get("Medicines/GetAllMedicines", {
        // params: {
        //   pageSize: this.resultPage.pageSize,
        //   pageIndex: this.resultPage.pageNumber,
        // },
      })
        .then((response) => {
          this.medicines = response.data;
          console.log(this.medicines);
        })
        .catch((error) => {
          console.log(error);
        });
      this.loading = false;
    },
    handleSubmit() {
      if (this.selectedMedicine != null) {
        this.updateMedicine();
      } else {
        this.createMedicine();
      }
    },
    async createMedicine() {
      // eslint-disable-next-line no-unused-vars
      HTTP.post("Medicines", JSON.stringify(this.medicineModel), {
        headers: { "Content-Type": "application/json; charset=utf8" },
      })
        .then((respone) => {
          console.log(respone);
        })
        .catch((error) => {
          console.log(error);
        });
      this.closeModal();
      this.getAllMedicine();
    },
    async updateMedicine() {
      // eslint-disable-next-line no-unused-vars
      HTTP.put(
        "Medicines/" + this.selectedMedicine.id,
        JSON.stringify(this.medicineModel),
        {
          headers: { "Content-Type": "application/json; charset=utf8" },
        }
      )
        .then((respone) => {
          console.log(respone);
        })
        .catch((error) => {
          console.log(error);
        });
      this.closeModal();
      this.getAllMedicine();
    },
    openCreateMedicine() {
      this.displayMedicineModal = true;
    },
    openEditMedicine(data) {
      this.displayMedicineModal = true;
      this.selectedMedicine = { ...data };
    },
    closeModal() {
      this.displayMedicineModal = false;
      this.resetForm();
    },
    deleteMedidcine(id) {
      this.$confirm.require({
        message: "Do you want to delete this record?",
        header: "Delete Confirmation",
        icon: "pi pi-info-circle",
        acceptClass: "p-button-danger",
        accept: async () => {
          // eslint-disable-next-line no-unused-vars
          HTTP.put("Medicines/DeleteMedicine/" + id)
            .then((response) => {
              console.log(response);
              this.$toast.add({
                severity: "info",
                summary: "Confirmed",
                detail: "Record deleted",
                life: 3000,
              });
              this.getAllMedicine();
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
    restoreMedicine(id) {
      this.$confirm.require({
        message: "Do you want to restore this record?",
        header: "Restore Confirmation",
        icon: "pi pi-info-circle",
        acceptClass: "p-button-success",
        accept: async () => {
          HTTP.put("Medicines/RestoreMedicne?id=" + id)
            .then((response) => {
              console.log(response);
              this.$toast.add({
                severity: "info",
                summary: "Confirmed",
                detail: "Record has been restore",
                life: 3000,
              });
              this.getAllMedicine();
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
    dateToYMD(date) {
      var ed = new Date(date);
      var d = ed.getDate();
      var m = ed.getMonth() + 1;
      var y = ed.getFullYear();
      return (
        "" + y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d)
      );
    },
    resetForm() {
      this.selectedMedicine = null;
      this.medicineModel.id = "";
      this.medicineModel.medicineName = "";
      this.medicineModel.amount = "";
      this.medicineModel.price = "";
      this.medicineModel.expirationDate = "";
      this.medicineModel.description = "";
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
