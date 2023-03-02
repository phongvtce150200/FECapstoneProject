/* eslint-disable vue/multi-word-component-names */
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/style/global.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./axios";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import BootstrapVue3 from "bootstrap-vue-3";
import "./callhub.js";
import { registerGlobalComponents } from "./utils/import";
import mitt from "mitt"; // Import mitt
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import Checkbox from "primevue/checkbox";
import PrimeVue from "primevue/config";
import DataTable from "primevue/datatable";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import AutoComplete from "primevue/autocomplete";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import Row from "primevue/row";
import Button from "primevue/button";
import ConfirmationService from "primevue/confirmationservice";
import ConfirmDialog from "primevue/confirmdialog";
import Dropdown from "primevue/dropdown";
import Paginator from "primevue/paginator";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import MultiSelect from "primevue/multiselect";
import Calendar from "primevue/calendar";
import Password from "primevue/password";
import Textarea from "primevue/textarea";
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primeicons/primeicons.css";
import Dialog from "primevue/dialog";
import ProgressSpinner from "primevue/progressspinner";
import DialogService from "primevue/dialogservice";
import DynamicDialog from "primevue/dynamicdialog";
import OrderList from "primevue/orderlist";
import Panel from "primevue/panel";
import Avatar from "primevue/avatar";
import Card from "primevue/card";
import Breadcrumb from "primevue/breadcrumb";
import InputSwitch from "primevue/inputswitch";
import Image from "primevue/image";
const emitter = mitt(); // Initialize mitt

const app = createApp(App);
app.use(BootstrapVue3);
registerGlobalComponents(app);

app.use(router);
app.provide("emitter", emitter);
app.use(PrimeVue);
app.use(ConfirmationService);
app.use(ToastService);
app.component("Checkbox", Checkbox);
app.use(DialogService);
library.add(fas, fab, far);
app.component("DynamicDialog", DynamicDialog);
app.component("DataTable", DataTable);
app.component("OrderList", OrderList);
app.component("InputText", InputText);
app.component("InputNumber", InputNumber);
app.component("AutoComplete", AutoComplete);
app.component("Column", Column);
app.component("ColumnGroup", ColumnGroup);
app.component("Row", Row);
app.component("Button", Button);
app.component("ConfirmDialog", ConfirmDialog);
app.component("Dropdown", Dropdown);
app.component("Paginator", Paginator);
app.component("Toast", Toast);
app.component("MultiSelect", MultiSelect);
app.component("Dialog", Dialog);
app.component("Calendar", Calendar);
app.component("Password", Password);
app.component("Textarea", Textarea);
app.component("ProgressSpinner", ProgressSpinner);
app.component("Panel", Panel);
app.component("Avatar", Avatar);
app.component("Card", Card);
app.component("Breadcrumb", Breadcrumb);
app.component("InputSwitch", InputSwitch);
app.component("font-awesome-icon", FontAwesomeIcon);
app.component("Image", Image);
import "bootstrap/dist/js/bootstrap.js";
app.mount("#app");
