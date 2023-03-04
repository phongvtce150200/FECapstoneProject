<template>
  <!-- <h1>404</h1>
  <p>Oops! Something is wrong.</p>
  <router-link class="button" :to="{ name: 'home', params: {} }"
    ><i class="icon-home"></i> Go back in initial page, is better.</router-link
  > -->
  <div class="page-404">
    <div class="spinner-loading" v-if="loading">
      <ProgressSpinner
        style="width: 50px; height: 50px"
        strokeWidth="3"
        animationDuration=".6s"
      />
    </div>
    <div class="container">
      <div class="row justify-content-between align-items-center mt-5">
        <div class="col-lg-6">
          <div class="img-area">
            <img src="./../assets/image/404.png" alt="image" />
          </div>
        </div>
        <div class="col-lg-5">
          <div class="section-text">
            <h1 class="title">Page Not Found</h1>
            <p class="message__title">
              We're sorry, the page you were looking for isn't found here. The
              link you followed may either be broken or no longer exists. Please
              try again, or take a look at our.
            </p>
          </div>
          <div class="btn-login">
            <Button
              label="GO TO HOME"
              class="p-button-rounded"
              @click="goToHome()"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- <style scoped>
.button {
  font-weight: 300;
  color: #fff;
  font-size: 1.2em;
  text-decoration: none;
  border: 1px solid #efefef;
  padding: 0.5em;
  border-radius: 3px;
  float: left;
  margin: 6em 0 0 -155px;
  left: 52%;
  position: relative;
  transition: all 0.3s linear;
  background-color: #007aff;
}

.button:hover {
  background-color: #007aff;
  color: #fff;
}

p {
  font-size: 2em;
  text-align: center;
  font-weight: 100;
}

h1 {
  text-align: center;
  font-size: 15em;
  font-weight: 100;
}
</style> -->

<script>
export default {
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    goToHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style>
.page-404 {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-404 .message__title {
  font-size: 26px;
}

.page-404 .btn-login Button {
  font-size: 26px;
}

.page-404 .p-progress-spinner {
  display: flex;
  position: fixed;
  top: 50%;
  bottom: 0;
  left: 0;
  right: 0;
}

.page-404 .spinner-loading {
  display: flex;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  z-index: 9999999;
  opacity: 0.5;
}
</style>
