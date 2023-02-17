<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container mb-4">
    <h1 class="intro-title text-center text-decoration-underline">
      SIGN UP FOR TREATMENT
    </h1>
    <div class="intro-content w-50 container">
      <p>
        Customers wishing to make an appointment at EGO Clinic System, please
        follow the instructions:
      </p>
      <div class="">
        <li>
          Make an appointment by calling the Customer Care switchboard at
          <span> 0287 102 6789</span> – <span>0287 300 6858</span> (EGO General
          Clinic in Can Tho City) or <span> 1800 6858</span> –
          <span>024 7106 6858</span>
          (EGO General Clinic in Hanoi).
        </li>
        <li>Book an appointment online by filling out the form below.</li>
        <li>
          Please note, in case of emergency, please immediately go to the
          nearest medical facility or go directly to the EGO Polyclinic System.
        </li>
      </div>
      <div
        class="container mt-3"
        style="display: flex; justify-content: center"
      >
        <div class="card" style="width: 50rem; border-radius: 11px">
          <div
            class="card-header"
            style="
              background-color: #cb5850;
              border-radius: 10px;
              height: 70px;
              align-items: center;
              display: flex;
            "
          >
            <h5 class="text-white">Make Appointment with our doctor</h5>
          </div>
          <div class="card-body">
            <p class="card-text">Choose a test location</p>
            <div class="d-flex justify-content-around mb-3">
              <div>
                <input type="radio" name="location" />EGO General Clinic (Can
                Tho City)
              </div>
              <div>
                <input type="radio" name="location" /> EGO General Clinic (Ha
                Noi)
              </div>
            </div>
            <p class="card-text">Select type of examination service</p>
            <div class="d-flex justify-content-around mb-3">
              <div><input type="radio" name="method" />Check in time</div>
              <div><input type="radio" name="method" /> Out of time</div>
              <div><input type="radio" name="method" /> Online examination</div>
            </div>
            <div class="d-flex justify-content-around mb-3">
              <div>
                <input type="text" placeholder="Choose a medical specialty" />
              </div>
              <div><input type="text" placeholder="Choose a doctor" /></div>
            </div>
            <div class="d-flex justify-content-center mb-3">
              <input
                type="text"
                placeholder="Choose the date and time of your medical examination"
              />
            </div>
            <p class="card-text">Health problems that need to be examined</p>
            <div class="d-flex justify-content-around mb-3">
              <div>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Enter your medical condition, questions for the doctor and health problems to see"
                ></textarea>
              </div>
            </div>
            <a
              href="#"
              class="submit-button d-flex justify-content-center"
              style="text-decoration: none"
            >
              <span class="text-white text-decoration-none">Submit</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  font-weight: 400;
}
.intro-title {
  color: #840e07;
}
.intro-content li span {
  color: red;
}
.card {
  background-color: #fecccc;
}
.submit-button {
  background-color: #ca574f;
  border-radius: 100px;
  height: 40px;
  align-items: center;
}
input {
  border-radius: 100px;
}
input::placeholder {
  color: #000;
}
textarea {
  border-radius: 15px;
}
</style>
