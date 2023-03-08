<!-- eslint-disable vue/valid-template-root -->
<template>
  <div class="container">
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-8 text-center">
        <!-- <span style="font-size: 90px">
          <i class="fa-solid fa-lock" aria-hidden="true"></i>
        </span>
        <img
          src="../assets/image/refresh.png"
          alt=""
          class="refresh-img spin"
        /> -->
        <div
          style="
            position: relative;
            display: inline-block;
            margin-top: 30px;
            margin-bottom: 30px;
          "
        >
          <img
            src="../assets/image/refresh.png"
            alt=""
            class="refresh-img spin"
          />
          <span class="span-icon">
            <i
              class="fa-solid fa-lock"
              aria-hidden="true"
              style="font-size: 120px"
            ></i>
          </span>
        </div>
        <form>
          <div class="d-flex flex-column">
            <div class="d-flex justify-content-around">
              <div class="p-2">
                <input
                  class="w-100"
                  type="password"
                  placeholder="Please enter your old password"
                />
              </div>
            </div>
            <div class="d-flex justify-content-around">
              <div class="p-2">
                <input
                  class="w-100"
                  type="password"
                  placeholder="Please enter your new password"
                />
              </div>
            </div>
            <div class="d-flex justify-content-around">
              <div class="p-2">
                <input
                  class="w-100"
                  type="password"
                  placeholder="Please confirm your new password"
                />
              </div>
            </div>
            <div class="d-flex justify-content-around button">
              <button class="btn btn-primary">Confirm</button>
              <button class="btn btn-secondary">Cancel</button>
            </div>
          </div>
        </form>
      </div>
      <div class="col-md-2"></div>
    </div>
  </div>
</template>
<style>
.button {
  margin-left: 250px;
  margin-right: 250px;
  margin-top: 10px;
  margin-bottom: 30px;
}
.p-2 {
  width: 80%;
}
.input.w-100 {
  border-radius: 5px;
}
.span-icon {
  position: absolute;
  top: 46%;
  right: 50%;
  transform: translate(50%, -50%);
}
.refresh-img {
  width: 300px;
  height: 250px;
}
.col-md-8.text-center {
  border: 1px solid #ccc;
  background: whitesmoke;
  border-radius: 5px;
}
.spin {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
