<template>
  <div>
    <Button
      label="Adding Service"
      class="p-button-rounded p-button-success mb-3"
      @click="openCreateService()"
    />
  </div>
  <div>
    <DataTable
      :value="services"
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
      :globalFilterFields="['serviceName']"
    >
      <template #header>
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="m-0">Service Manage</h5>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              placeholder="Keyword Search"
              v-model="filters['serviceName'].value"
            />
          </span>
        </div>
      </template>
      <template #empty> No project found. </template>
      <template #loading>
        <ProgressSpinner />
      </template>
      <div>
        <Column field="serviceName" header="Services Name">
          <template #body="{ data }">
            {{ data.serviceName }}
          </template>
        </Column>
        <Column field="servicePrice" header="Services Price">
          <template #body="{ data }">
            {{ data.servicePrice }}
          </template>
        </Column>
        <Column field="actions" header="Actions">
          <template #body="{ data }">
            <Button
              label="Edit"
              class="p-button-raised p-button-warning me-2"
              @click="openEditService(data)"
            />
            <Button
              label="Delete"
              class="p-button-raised p-button-danger me-2"
              :class="{ disable: data.isDelete === true }"
              @click="deleteService(data.id)"
            />
            <Button
              label="Restore"
              class="p-button-raised"
              @click="restoreService(data.id)"
            />
          </template>
        </Column>
      </div>
    </DataTable>
  </div>
  <Dialog
    :header="selectedService != null ? 'Edit Service' : 'Adding New Service'"
    v-model:visible="displayServiceModal"
    :closable="false"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw' }"
    :modal="true"
  >
    <div class="mb-3">
      <label class="mb-2">Service Name:</label>
      <InputText v-model="servicesModel.serviceName" style="width: 100%" />
    </div>
    <div>
      <label>Price:</label>
      <InputNumber
        v-model="servicesModel.servicePrice"
        showButtons
        style="width: 100%"
        min="0"
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
</template>
<script>
import axios from "axios";
import { FilterMatchMode } from "primevue/api";
export default {
  data() {
    return {
      services: [],
      loading: false,
      displayServiceModal: false,
      filters: {
        serviceName: {
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
      },
      servicesModel: {
        id: "",
        serviceName: "",
        servicePrice: "",
      },
      selectedService: null,
    };
  },
  created() {
    this.getAllService();
  },
  beforeUpdate() {
    if (this.selectedService != null) {
      this.servicesModel.id = this.selectedService.id;
      this.servicesModel.serviceName = this.selectedService.serviceName;
      this.servicesModel.servicePrice = this.selectedService.servicePrice;
    }
  },
  methods: {
    async getAllService() {
      // eslint-disable-next-line no-unused-vars
      const respone = await axios
        .get("Services")
        .then((response) => {
          this.services = response.data;
          console.log(this.services);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openCreateService() {
      this.displayServiceModal = true;
    },
    closeModal() {
      this.displayServiceModal = false;
      this.resetForm();
    },
    handleSubmit() {
      if (this.selectedService != null) {
        this.updateService();
      } else {
        this.createService();
      }
    },
    openEditService(data) {
      this.displayServiceModal = true;
      this.selectedService = { ...data };
    },
    resetForm() {
      this.selectedService = null;
      this.servicesModel.id = "";
      this.servicesModel.serviceName = "";
      this.servicesModel.servicePrice = "";
    },
    async createService() {
      // eslint-disable-next-line no-unused-vars
      const respone = await axios
        .post("Services", JSON.stringify(this.servicesModel), {
          headers: { "Content-Type": "application/json; charset=utf8" },
        })
        .then((respone) => {
          console.log(respone);
        })
        .catch((error) => {
          console.log(error);
        });
      this.closeModal();
      this.getAllService();
    },
    async updateService() {
      // eslint-disable-next-line no-unused-vars
      const respone = await axios
        .put(
          "Services/" + this.selectedService.id,
          JSON.stringify(this.servicesModel),
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
      this.getAllService();
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
