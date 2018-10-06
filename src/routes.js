
import Cadastro from './components/cadastro/Cadastro.vue'
import Home from './components/home/Home.vue'

export const routes = [
    {
        path: '/',
        component: Home,
        name: "home",
        titulo: "Home",
        menu: true
    },
    {
        path: '/cadastro',
        component: Cadastro,
        name: "cadastro",
        titulo: "Cadastro",
        menu: true
    },
    {
        path: '/cadastro/:id',
        component: Cadastro,
        name: "altera",
        menu: false
    },
    {
        path: '*',
        component: Home,
        menu: false
    }
]