<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container d-flex flex-column">
    <div class="justify-content-center">
      <div>
        <h1 class="text-center">Predict With Machine Learning</h1>
        <form @submit.prevent="submitImage" class="text-center">
          <div v-if="previewUrl" class="mb-3">
            <img :src="previewUrl" alt="Preview" width="200" />
          </div>
          <label class="label">
            <input type="file" @change="onFileChange" accept="image/*" />
            <span>Select a file</span>
          </label>

          <button
            type="submit"
            :disabled="!selectedFile"
            class="btn btn-warning"
          >
            Upload
          </button>
        </form>
      </div>
      <div v-if="loading"><i class="fa fa-spinner fa-spin"></i> Loading...</div>
      <div v-if="result">
        <h2>Result</h2>
        <ul>
          <li v-for="(value, key) in result.percentage" :key="key">
            {{ key }}: {{ value }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { HTTP } from "@/axios";

export default {
  data() {
    return {
      selectedFile: null,
      previewUrl: null,
      result: null,
      loading: false,
    };
  },
  methods: {
    onFileChange(event) {
      this.selectedFile = event.target.files[0];
      this.previewUrl = URL.createObjectURL(this.selectedFile);
    },
    async submitImage() {
      this.loading = true;
      const formData = new FormData();
      formData.append("file", this.selectedFile);
      try {
        const response = await HTTP.post(
          "Test/CheckAlzheimerDisease",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.result = response.data;
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
  },
};
</script>
<style scoped>
label.label input[type="file"] {
  position: absolute;
  top: -1000px;
}
.label {
  cursor: pointer;
  border: 1px solid #cccccc;
  border-radius: 5px;
  padding: 5px 15px;
  margin: 5px;
  background: #dddddd;
  display: inline-block;
}
.label:hover {
  background: #5cbd95;
}
.label:active {
  background: #9fa1a0;
}
.label:invalid + span {
  color: #000000;
}
.label:valid + span {
  color: #ffffff;
}
</style>
