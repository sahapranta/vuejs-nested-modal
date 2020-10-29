import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/products"
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/products",
    name: "Products",
    component: function() {
      return import(/* webpackChunkName: "products" */ "../views/Products.vue");
    }
  },
  {
    path: "/categories",
    name: "Categories",
    component: function() {
      return import(/* webpackChunkName: "category" */ "../views/Category.vue");
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
