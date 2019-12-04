import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import store from "./store"; // TODO: How do we import the store globally ? 

Vue.use(Router);

const redirectIfLoggedIn = function(next) {
  if (store.getters.isLoggedIn) {
    next("dashboard");
  }
  else{
    next();
  }
}

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue"),
      beforeEnter: (to, from, next) => redirectIfLoggedIn(next)
    },
    {
      path: "/registration",
      name: "registration",
      component: () => import("./views/Registration.vue"),
      beforeEnter: (to, from, next) => redirectIfLoggedIn(next)
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: () => import("./views/Dashboard.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/admin",
      name: "Admin",
      component: () => import("./views/Admin.vue"),
      meta: {
        requiresAuth: true,
        is_admin: true
      }
    },
    {
      path: "/account",
      name: "Account",
      component: () =>import("./views/Account.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/browse",
      name: "Browse",
      component: () => import("./views/DatasetBrowserView.vue")
    },
    {
      path: "/table",
      name: "table",
      component: () => import("./views/Table.vue")
    },
    {
      path: "/charts",
      name: "Charts",
      component: () => import("./views/Charts.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  let auth = store.getters.isLoggedIn;
  let admin = false; //TODO: Set admin permission


  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (auth) {
      if (to.matched.some(record => record.meta.is_admin)) {
        //check to see if admin
        if (admin) {
          next();
        }
        // else{
        //   alert user does not have admin privileges
        // }
      } else {
        //authorize to dashboard if user is logged in but is not admin
        next();
      }
    } else {
      //redirect to login page if user is not authorized to view dashboard
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
});
export default router;
