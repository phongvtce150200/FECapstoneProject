import { createRouter, createWebHistory } from "vue-router";

const requireLogin = (to, from, next) => {
  const token = localStorage.getItem("token");
  if (!token) next({ name: "Login", params: {} });
  else next();
};

const isLoggedIn = (to, from, next) => {
  const token = localStorage.getItem("token");
  if (token) {
    next({ name: "Home", params: {} });
    router.push({ name: "home", params: {} });
  } else next();
};

const routes = [
  {
    path: "/",
    name: "home",
    meta: {
      layout: "default",
    },
    component: () => import("../views/index.vue"),
  },
  {
    path: "/Authentication",
    name: "Authentication",
    meta: {
      layout: "auth",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/authentication.vue"),
    beforeEnter: isLoggedIn,
  },
  {
    path: "/Appointment",
    name: "Appointment",
    meta: {
      layout: "default",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/appointment.vue"),
    beforeEnter: requireLogin,
  },
  {
    path: "/Dashboard",
    name: "Dashboard",
    meta: {
      layout: "admin",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/dashboard.vue"),
    //beforeEnter: requireLogin,
  },
  {
    path: "/ReceivePatient",
    name: "ReceivePatient",
    meta: {
      layout: "admin",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/receivepatient.vue"),
    //beforeEnter: requireLogin,
  },
  {
    path: "/MedicalExam",
    name: "MedicalExam",
    meta: {
      layout: "admin",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/medicalexam.vue"),
    //beforeEnter: requireLogin,
  },
  {
    path: "/DoctorAppointment",
    name: "DoctorAppointment",
    meta: {
      layout: "admin",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/doctorAppointment.vue"),
    //beforeEnter: requireLogin,
  },
  {
    path: "/Medicine",
    name: "Medicine",
    meta: {
      layout: "admin",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/medicineManage.vue"),
    //beforeEnter: requireLogin,
  },
  {
    path: "/Doctor",
    name: "Doctor",
    meta: {
      layout: "admin",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/doctorManage.vue"),
    //beforeEnter: requireLogin,
  },
  {
    path: "/Nurse",
    name: "Nurse",
    meta: {
      layout: "admin",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/nurseManage.vue"),
    //beforeEnter: requireLogin,
  },
  {
    path: "/Service",
    name: "Service",
    meta: {
      layout: "admin",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/serviceManage.vue"),
    //beforeEnter: requireLogin,
  },
  {
    path: "/Invoice",
    name: "Invoice",
    meta: {
      layout: "admin",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/invoiceManage.vue"),
    //beforeEnter: requireLogin,
  },
  {
    path: "/Test",
    name: "Test",
    meta: {
      layout: "admin",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/testManage.vue"),
    //beforeEnter: requireLogin,
  },
  {
    path: "/Prescription",
    name: "Prescription",
    meta: {
      layout: "admin",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/prescriptionManage.vue"),
    //beforeEnter: requireLogin,
  },
  {
    path: "/Patient",
    name: "Patient",
    meta: {
      layout: "admin",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/patientManage.vue"),
    //beforeEnter: requireLogin,
  },
  {
    path: "/ResetPassword",
    name: "ResetPassword",
    // meta: {
    //   layout: "admin",
    // },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/resetPassword.vue"),
    //beforeEnter: requireLogin,
  },
  {
    path: "/Register",
    name: "Register",
    meta: {
      layout: "auth",
    },
    component: () => import("../views/register.vue"),
    //beforeEnter: requireLogin,
  },
  {
    path: "/UserProfile",
    name: "userProfile",
    meta: {
      layout: "userProfile",
    },
    component: () => import("../views/userProfile.vue"),
  },
  {
    path: "/DoctorProfile",
    name: "DoctorProfile",
    meta: {
      layout: "admin",
    },
    component: () => import("../views/doctorProfile.vue"),
  },
  {
    path: "/NurseProfile",
    name: "NurseProfile",
    meta: {
      layout: "admin",
    },
    component: () => import("../views/nurseProfile.vue"),
  },
  {
    path: "/Login",
    name: "Login",
    meta: {
      layout: "auth",
    },
    component: () => import("../views/login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
