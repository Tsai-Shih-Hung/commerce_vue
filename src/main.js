// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
}
);

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth){
  const api='https://vue-course-api.hexschool.io/api/user/check';
  const vm = this;
  axios.post(api).then((response) => {
    console.log(response.data);
    if(response.data.success){
      next();
    }
    else({
      path:'/login'
    })
    });
  }
  else{
    next();
  }
})

