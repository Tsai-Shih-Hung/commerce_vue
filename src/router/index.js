import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/components/HelloWorld';
import login from '@/components/pages/login';
import dashboard from '@/components/dashboard';
import products from '@/components/pages/products';

Vue.use(VueRouter)
export default new VueRouter({
    routes: [
        {
            path:'*',
            redirect:'login'
        },
        {
            name:'首頁',
            path:'/',
            component:Home,
            meta:{requiresAuth:true}
        },
        {
            name:'login',
            path:'/login',
            component:login,
        },
        {
            name:'dashboard',
            path:'/dashboard',
            component:dashboard,
            //meta:{requiresAuth:true}
            children:[
                {
                    name:'products',
                    path:'/products',
                    component:products,
                }
            ]
        }


    ]
});