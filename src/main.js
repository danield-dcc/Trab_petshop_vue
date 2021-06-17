import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
//Vue.prototype.$urlAPI = "https://trab-revenda.herokuapp.com"
//endereço do Heroku
//parar testar na máquina local basta trocar o endereço("http://localhost:3000")
Vue.prototype.$urlAPI = "http://localhost:3000"

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
