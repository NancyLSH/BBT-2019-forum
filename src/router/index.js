import Vue from "vue";
import VueRouter from "vue-router";
import login from "../components/login.vue"
import homePage from "../components/homePage.vue"
import main from "../components/main.vue"
import write from "../components/write.vue"
import settings from "../components/change.vue"
import forum from "../components/forum.vue"

Vue.use(VueRouter)


export default new VueRouter({
    mode:'history',
    routes: [
        {
            path: '/home',
            component: homePage
        },
        {
            path:'/login',
            component:login
        },
        {
            name:'main',
            path:'/main',
            component:main
        },
        {
            path:'/write',
            component:write
        },
        {
            path:'/settings',
            component:settings
        },
        {
            name:"forum",
            path:'/forum',
            component:forum
        }
    ]
})