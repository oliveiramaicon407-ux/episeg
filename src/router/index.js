import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Cadastro from '../views/Cadastro.vue'
import Dashboard from '../views/Dashboard.vue'
import Funcionarios from '../views/Funcionarios.vue'
import Estoque from '../views/Estoque.vue'
import Cadastrofun from '../views/Cadastrofun.vue'
import CadastroEPI from '../views/CadastroEPI.vue'
import Entrega from '../views/Entrega.vue'
const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/cadastro',
    component: Cadastro
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      { path: 'cadastro', component: Cadastro },
      { path: 'funcionarios', component: Funcionarios },
      { path: 'estoque', component: Estoque },
      { path: 'CadastroEPI', component: CadastroEPI },
      { path: 'cadastrofun', component: Cadastrofun },
      { path: 'Entrega', component: Entrega },
    ]
  }
]

// Cria a instância do router
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router