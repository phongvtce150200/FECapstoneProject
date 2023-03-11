import { createRouter, createWebHistory } from "vue-router";

const requireLogin = (to, from, next) => {
  const token = localStorage.getItem("token");
  if (!token) next({ name: "Login", params: {} });
  else next();
};

const ifHaveRole = (to, from, next) => {
  const role = localStorage.getItem("role");
  if (role === "Doctor" || role === "Nurse" || role === "Admin") {
    next({ name: "Dashboard", params: {} });
  } else next();
};
const ifHaveNotRole = (to, from, next) => {
  const role = localStorage.getItem("role");
  if (role === "Patient") {
    next({ name: "home", params: {} });
  } else next();
};

const isLoggedIn = (to, from, next) => {
  const token = localStorage.getItem("token");
  if (token) {
    next({ name: "home", params: {} });
    router.push({ name: "home", params: {} });
  } else next();
};

const routes = [
  {
    path: "/404NotFound",
    name: "404",
    meta: {
      layout: "404Page",
    },
    component: () => import("../layout/notFoundPage.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404NotFound",
  },
  {
    path: "/",
    name: "home",
    meta: {
      layout: "default",
    },
    component: () => import("../views/index.vue"),
    beforeEnter: ifHaveRole,
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
    beforeEnter: [requireLogin, ifHaveNotRole],
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
    beforeEnter: [requireLogin, ifHaveNotRole],
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
    beforeEnter: [requireLogin, ifHaveNotRole],
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
    beforeEnter: [requireLogin, ifHaveNotRole],
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
    beforeEnter: [requireLogin, ifHaveNotRole],
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
    beforeEnter: [requireLogin, ifHaveNotRole],
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
    beforeEnter: [requireLogin, ifHaveNotRole],
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
    beforeEnter: [requireLogin, ifHaveNotRole],
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
    beforeEnter: [requireLogin, ifHaveNotRole],
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
    beforeEnter: [requireLogin, ifHaveNotRole],
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
    beforeEnter: [requireLogin, ifHaveNotRole],
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
    beforeEnter: [requireLogin, ifHaveNotRole],
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
  },
  {
    path: "/Register",
    name: "Register",
    meta: {
      layout: "auth",
    },
    component: () => import("../views/register.vue"),
  },
  {
    path: "/UserProfile",
    name: "userProfile",
    meta: {
      layout: "default",
    },
    component: () => import("../views/userProfile.vue"),
    beforeEnter: [requireLogin, ifHaveRole],
  },
  {
    path: "/DoctorProfile",
    name: "DoctorProfile",
    meta: {
      layout: "admin",
    },
    component: () => import("../views/doctorProfile.vue"),
    beforeEnter: [requireLogin, ifHaveNotRole],
  },
  {
    path: "/NurseProfile",
    name: "NurseProfile",
    meta: {
      layout: "admin",
    },
    component: () => import("../views/nurseProfile.vue"),
    beforeEnter: [requireLogin, ifHaveNotRole],
  },
  {
    path: "/Login",
    name: "Login",
    meta: {
      layout: "auth",
    },
    component: () => import("../views/login.vue"),
  },
  {
    path: "/Test",
    name: "Test",
    meta: {
      layout: "admin",
    },
    component: () => import("../views/test.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
