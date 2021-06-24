import Vue from 'vue'
import VueRouter from 'vue-router'

import BoasVindas from './components/BoasVindas'
import CadastroCaes from './components/CadastroCaes'
import FormCaes from './components/FormCaes'
import FormLogin from './components/FormLogin'
import CadastroClientes from './components/CadastroClientes'
import FormClientes from './components/FormClientes'
import CadastroUsuarios from './components/CadastroUsuarios'
import FormUsuarios from './components/FormUsuarios'

Vue.use(VueRouter)

const routes = [
    {path: '/', component: BoasVindas},
    {path: '/cadcaes', component:CadastroCaes },
    {path: '/formcaes', component: FormCaes },
    {path: '/formlogin', component: FormLogin },
    {path: '/cadclientes', component: CadastroClientes },
    {path: '/formclientes', component: FormClientes },
    {path: '/cadusuarios', component: CadastroUsuarios },
    {path: '/formusuarios', component: FormUsuarios },
]

export default new VueRouter({
    mode: 'history',
    routes
})