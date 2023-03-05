<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container d-flex">
    <div class="col-md-2" style="margin-right: 5px">
      <table class="table border-secondary" border="1">
        <thead>
          <tr>
            <th class="table-danger">
              <p>Queue</p>
            </th>
          </tr>
          <tr>
            <th>
              <form action="">
                <input
                  class="form-control"
                  type="text"
                  placeholder="Find Patient"
                  style="text-align: center"
                />
              </form>
            </th>
          </tr>
        </thead>
        <tbody style="text-align: center" id="patientBody">
          <tr
            v-for="(item, index) in queue"
            :key="index"
            style="display: table; width: 100%; table-layout: fixed"
          >
            <td>
              <button
                style="border: none; background: none"
                @click="setData(index)"
              >
                {{ item.patient.user.fullName }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <table class="table table-bordered border-secondary">
        <thead class="table-danger">
          <tr>
            <th>
              <p>Previous prescription</p>
            </th>
          </tr>
        </thead>
        <!-- chỗ này cần sroll box -->
        <tbody style="height: 200px">
          <tr>
            <td>
              <a href="" style="text-decoration: none"
                >List các toa thuốc cũ của bệnh nhân</a
              >
            </td>
          </tr>
        </tbody>
      </table>

      <div
        style="
          align-items: center;
          flex-direction: column;
          justify-content: space-around;
          display: flex;
        "
      >
        <button
          id="saveAndPrintBtn"
          data-bs-toggle="modal"
          data-bs-target="#printModal"
          class="btn btn-success"
          style="margin-bottom: 20px"
        >
          Save and Print
        </button>
      </div>
    </div>
    <div class="col-md-10">
      <table class="table table-bordered border-secondary">
        <thead>
          <tr class="table-danger">
            <th>
              <p>Patient Infomation</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="d-flex justify-content-between">
              Full Name:
              <input
                v-model="fullName"
                type="text"
                class="form-control"
                readonly
              />
              DoB:
              <input
                v-model="birthDay"
                type="date"
                class="form-control"
                style="width: 200px"
                readonly
              />
              Gender:
              <input
                type="text"
                v-model="gender"
                class="form-control"
                style="width: 80px"
                readonly
              />
            </td>
            <td class="d-flex justify-content-between">
              Address:
              <input
                v-model="address"
                type="text"
                class="form-control"
                readonly
              />

              Phone Number:
              <input
                v-model="phoneNumber"
                type="text"
                class="form-control"
                style="width: 200px"
                readonly
              />
            </td>
            <td class="d-flex justify-content-between">
              Pulse:
              <input
                type="number"
                v-model="Pulse"
                placeholder="bpm"
                class="form-control"
                style="width: 80px"
                readonly
              />
              Blood Pressure:
              <input
                type="number"
                v-model="BloodPressure"
                placeholder="mmHg"
                class="form-control"
                style="width: 100px"
                readonly
              />
              Temperature:
              <input
                type="number"
                v-model="Tempurature"
                placeholder="°C"
                class="form-control"
                style="width: 80px"
                readonly
              />
              Weight:
              <input
                type="number"
                v-model="Weight"
                placeholder="Kg"
                class="form-control"
                style="width: 80px"
                readonly
              />
              Height:
              <input
                type="number"
                v-model="Height"
                placeholder="Cm"
                class="form-control"
                style="width: 80px"
                readonly
              />
            </td>
          </tr>
        </tbody>
      </table>
      <table class="table table-bordered border-secondary">
        <thead>
          <tr>
            <th colspan="5" class="table-danger">
              <div class="d-flex justify-content-between">
                <p>Prescription</p>
                <div class="d-flex">
                  <p class="me-2">Using Day:</p>
                  <input
                    type="number"
                    placeholder="Day"
                    class="form-control"
                    style="width: 80px"
                  />
                </div>
                <div class="d-flex">
                  <p class="me-2">Re-examination day:</p>
                  <input type="date" class="form-control" style="width: 50%" />
                </div>
                <button
                  class="btn btn-danger"
                  @click="emptyMedicineInPrescription"
                >
                  Clear Prescription
                </button>
              </div>
            </th>
          </tr>
          <tr>
            <th>Medicine Name</th>
            <th>Using/day</th>
            <th>Using/times</th>
            <th>Method</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody
          style="height: 170px; border: 1px solid black"
          v-if="prescription.length > 0"
        >
          <tr v-for="(item, index) in prescription" :key="item.id">
            <td>{{ item.medicineName }}</td>
            <td>
              <input
                type="text"
                class="form-control"
                v-model="item.usingTime"
              />
            </td>
            <td>
              <input type="text" class="form-control" v-model="item.perTime" />
            </td>
            <td>
              <input type="text" class="form-control" v-model="item.method" />
            </td>
            <td>
              <a
                class="btn btn-danger"
                @click="deleteMedicineInPrescription(index, item)"
                >Delete Medicine</a
              >
            </td>
          </tr>

          <tr></tr>
        </tbody>
        <tbody v-else>
          <tr class="text-center" colspan="5" border="1">
            no Data
          </tr>
        </tbody>
      </table>
      <div style="height: 250px; overflow: auto" class="table table-bordered">
        <table id="medicineList" style="width: 100%; position: relative">
          <tr>
            <th class="table-danger" colspan="5">
              <div class="justify-content-between d-flex">
                <p>Medicine List</p>
                <input
                  type="text"
                  class="form-control"
                  style="width: 25%"
                  placeholder="Medicine Name"
                />
              </div>
            </th>
          </tr>
          <tr
            class="table-danger"
            style="position: sticky; top: 0; height: 40px; z-index: 99"
          >
            <th>Medicine Name</th>
            <th>Amount</th>
            <th>Expiration Date</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
          <tr v-for="(item, index) in medicines" :key="item.id">
            <td>{{ item.medicineName }}</td>
            <td>{{ item.medicineName }}</td>
            <td>{{ dateToYMD(item.expiration) }}</td>
            <td>{{ item.price }}</td>
            <td>
              <a
                class="btnAddMedicine btn btn-warning text-white"
                @click="addRowMethod(index, item)"
                >Add Medicine</a
              >
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
  <div
    class="modal fade"
    id="printModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Prescription</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body" id="prescription">
          <div class="d-flex justify-content-between">
            <div>
              <img
                src="../assets/image/VTP2_1.svg"
                height="50px"
                width="70px"
              />
            </div>
            <div>
              <p style="margin-top: 10px; color: gray">Presciption No #001</p>
            </div>
          </div>
          <hr style="margin-top: 0px" />
          <div class="d-flex justify-content-between prescriptionContent">
            <div>
              <b>Ego Clinic</b>
              <p>Specialist clinic</p>
              <p>Doctor: {{ this.doctorName }}</p>
              <p>TelePhone: 0909090090</p>
            </div>
            <div>
              <p class="text-end">Fpt University</p>
              <p class="text-end"><b>Working time</b></p>
              <p class="text-end">Monday to Friday</p>
              <p class="text-end">7:00 am to 6:00 pm</p>
            </div>
          </div>
          <h2 class="text-center mt-3">Presciption</h2>
          <div class="d-flex justify-content-between mt-3">
            <small
              >Patient Name: <b>{{ this.fullName }}</b>
            </small>
            <small
              >Gender: <b>{{ this.gender }}</b>
            </small>
            <small
              >Age: <b>{{ this.Age }}</b>
            </small>
            <small
              >Address: <b>{{ this.address }} </b>
            </small>
          </div>
          <div>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Medicine name</th>
                  <th>Using Time</th>
                  <th>using Day</th>
                  <th>Method</th>
                </tr>
              </thead>
              <tbody id="PresciptionTbody">
                <tr v-for="(item, index) in prescription" :key="index">
                  <td>{{ ++index }}</td>
                  <td>{{ item.medicineName }}</td>
                  <td>{{ item.usingTime }}</td>
                  <td>{{ item.perTime }}</td>
                  <td>{{ item.method }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="mt-5 bottom-0 start-50 row">
            <p>
              <b
                >Seek immediate medical attention if patient
                <ins>has any</ins> of the following symptoms:</b
              >
            </p>
            <div class="col-md-4">
              <p>- Convulsions</p>
              <p>- Sound asleep</p>
            </div>
            <div class="col-md-4">
              <p>- Vomiting</p>
              <p>- Persistent high fever</p>
            </div>
            <div class="col-md-4">
              <p>- Tired breathing</p>
              <p>- Bloody diarrhea</p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="openNewTab" type="button" class="btn btn-primary">
            Print
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
#patientBody {
  text-align: center;
  display: block;
  height: 150px;
  overflow-y: scroll;
}
.disable {
  pointer-events: none;
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}
.pdf-container {
  height: 500px;
}
</style>
<script>
//import puppeteer from "puppeteer";
import { HTTP } from "@/axios";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
export default {
  data() {
    return {
      showPDFContainer: false,
      connection: null,
      queue: [],
      medicines: [],
      prescription: [],
      doctorName: localStorage.getItem("fullName"),
      fullName: null,
      birthDay: "",
      address: "",
      gender: "",
      phoneNumber: "",
      Pulse: "",
      BloodPressure: "",
      Tempurature: "",
      Weight: "",
      Height: "",
      Age: "",
      usingDay: "",
      usingTime: "",
      usingMethod: "",
    };
  },
  created() {
    this.getMedicine();
    this.connection = new HubConnectionBuilder()
      .withUrl("https://localhost:5001/SignalRServer")
      .configureLogging(LogLevel.Information)
      .build();
    this.connection
      .start()
      .then(() => {
        this.getQueue();
        console.log("Connection started.");
        this.connection.on("ReceiveQueue", () => {
          this.getQueue();
        });
      })
      .catch((error) => console.error(error));
  },
  watch: {
    prescription: {
      handler: function Change(text) {
        console.log(text);
      },
    },
    deep: true,
  },
  methods: {
    async getQueue() {
      // eslint-disable-next-line no-unused-vars
      HTTP.get("Queue", {
        params: {
          doctorId: window.localStorage.getItem("DoctorId"),
        },
      })
        .then((response) => {
          this.queue = response.data;
          console.log(this.queue);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getMedicine() {
      // eslint-disable-next-line no-unused-vars
      HTTP.get("Medicines/GetAllMedicines")
        .then((response) => {
          this.medicines = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setData(index) {
      this.fullName = this.queue[index].patient.user.fullName;
      this.birthDay = this.dateToYMD(this.queue[index].patient.user.birthDay);
      this.address = this.queue[index].patient.user.address;
      this.gender = this.queue[index].patient.user.gender;
      this.phoneNumber = this.queue[index].patient.user.phoneNumber;
      this.Pulse = this.queue[index].pulse;
      this.BloodPressure = this.queue[index].bloodPressure;
      this.Tempurature = this.queue[index].tempurature;
      this.Weight = this.queue[index].weight;
      this.Height = this.queue[index].height;
      var currentYear = new Date().getFullYear();
      this.Age = currentYear - new Date(this.birthDay).getFullYear();
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
    addRowMethod(index, item) {
      const objWithIdIndex = this.medicines.findIndex(
        (obj) => obj.id === item.id
      );
      var element =
        document.getElementsByClassName("btnAddMedicine")[objWithIdIndex];
      element.classList.add("disable");
      var data = {
        amount: item.amount,
        createdBy: item.createdBy,
        createdDate: item.createdDate,
        deletedDate: item.deletedDate,
        description: item.description,
        expiration: item.expiration,
        id: item.id,
        isDelete: item.isDelete,
        medicineName: item.medicineName,
        price: item.price,
        updatedBy: item.updatedBy,
        updatedDate: item.updatedDate,
        usingTime: null,
        perTime: null,
        method: null,
      };
      console.log(data);
      this.prescription.push(data);
      console.log(this.prescription);
    },
    deleteMedicineInPrescription(index, item) {
      const objWithIdIndex = this.prescription.findIndex(
        (obj) => obj.id === item.id
      );

      if (objWithIdIndex > -1) {
        this.prescription.splice(objWithIdIndex, 1);
      }
      // this.prescription.splice(index, 1);
      const objWithIdIndex1 = this.medicines.findIndex(
        (obj) => obj.id === item.id
      );

      var element =
        document.getElementsByClassName("btnAddMedicine")[objWithIdIndex1];
      element.classList.remove("disable");
    },
    emptyMedicineInPrescription() {
      this.prescription = [];
    },
    openNewTab() {
      const printWindow = window.open("", "_blank", "width=400,height=500");
      printWindow.document.write(` <html>
      <head>
        <title>Prescription</title>
        <style>
        body {
            margin: 0;
            padding: 0;
            background-color: white;
          }
          h1 {
            text-align: center;
            margin-top: 30px;
            margin-bottom: 20px;
            font-size: 32px;
            font-weight: bold;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            margin-bottom: 30px;
          }
          table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
          }
          .print-btn {
            position: fixed;
            bottom: 0;
            right: 0;
            margin: 20px;
            padding: 10px 20px;
            background-color: #2196f3;
            color: white;
            font-size: 18px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            display: block;
          }
          @media print {
            button.print-btn {
            display: none;
            }
          }
        </style>
      </head>
      <body>
        <h1>Prescription</h1>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Medicine name</th>
              <th>Using Time</th>
              <th>using Day</th>
              <th>Method</th>
            </tr>
          </thead>
          <tbody>
            ${document.getElementById("PresciptionTbody").innerHTML}
          </tbody>
        </table>
        <button class="print-btn" onclick="window.print()">Print</button>
      </body>
    </html>`);
    },
  },
};
</script>
