import Vue from 'vue'
import App from './App.vue'
import router from './router'
//import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
//import { MdButton, MdContent, MdTabs } from 'vue-material/dist/components'

//import 'vue-material/dist/vue-material.min.css'
//import 'vue-material/dist/theme/default.css'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'


// Make BootstrapVue available throughout your project
// Vue.use(BootstrapVue)
// // Optionally install the BootstrapVue icon components plugin
// Vue.use(IconsPlugin)

Vue.config.productionTip = false
//Vue.prototype.$urlAPI = "https://trab-revenda.herokuapp.com"
//endereço do Heroku
//parar testar na máquina local basta trocar o endereço("http://localhost:3000")
Vue.prototype.$urlAPI = "http://localhost:3000"

new Vue({
  //MdButton, MdContent, MdTabs,
  router,
  render: h => h(App),
}).$mount('#app')
