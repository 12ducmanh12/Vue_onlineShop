import HomePage from "./layout/HomePage.vue";
import Login from "./pages/login/Login.vue";
import Register from "./pages/register/Register.vue";
import Cart from "./layout/cart/Cart.vue";
import Admin from "./pages/admin/Admin.vue";

import { createRouter, createWebHistory } from "vue-router";



const routes = [
    {path: "/", component: HomePage},
    {path: "/login", component: Login},
    {path: "/register", component: Register},
    {path: "/cart", component: Cart},
    {path: "/admin", component: Admin},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router