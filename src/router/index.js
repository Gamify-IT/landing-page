import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import App from "../views/App.vue";

Vue.use(VueRouter);

// all frontend routes of the app, i.e. bind a path to a Vue component
const routes = [
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/register",
        name: "Register",
        component: Register
    },
    {
        path: "/app",
        name: "App",
        component: App
    },
    { path: 
        '/:pathMatch(.*)*', 
        name: 'Not-Found', 
        component: App 
    }
];

const router = new VueRouter({
    routes
});

export default router;
