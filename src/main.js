import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from 'element-ui';


import 'element-ui/lib/theme-chalk/index.css';
import "./assets/css/index.css"

router.beforeEach((to,from,next)=>{
  if(to.path=="/login"){
    next()
    return
  }
  if(localStorage.getItem("token")){
    next()
  }else{
    router.path="/login"
  }
})

Vue.config.productionTip = false;
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
