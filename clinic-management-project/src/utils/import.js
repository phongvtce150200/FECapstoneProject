/* eslint-disable prettier/prettier */
import { defineAsyncComponent } from "vue";

export function registerGlobalComponents(app) {
  app.component(
    "auth-layout",
    defineAsyncComponent(() => import("@/layout/auth"))
  );

  app.component(
    "default-layout",
    defineAsyncComponent(() => import("@/layout/default"))
  );

  app.component(
    "admin-layout",
    defineAsyncComponent(() => import("@/layout/admin"))
  );
  app.component(
    "userProfile-layout",
    defineAsyncComponent(() => import("@/layout/userProfile"))
  )
  app.component(
    "register-layout",
    defineAsyncComponent(() => import("@/layout/register"))
  )
}
