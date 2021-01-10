import Vue from 'vue'
import App from './App.vue'
import 'vue-material-design-icons/styles.css'
//import 'expose?$!expose?jQuery!jquery'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
