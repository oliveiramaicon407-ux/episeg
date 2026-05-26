<template>
  <div class="shell">
    <aside class="sidebar">
      <h1 class="logo">
        <img src="../assets/logo.png" alt="Sistema EPI Logo" class="logo-img" />
        <span>Sistema EPI</span>
      </h1>

      <nav class="menu">
        <RouterLink to="/funcionarios" class="menu-item" active-class="active">
          <i class="fas fa-users"></i>
          <span>Funcionários</span>
        </RouterLink>

        <RouterLink to="/estoque" class="menu-item" active-class="active">
          <i class="fas fa-boxes"></i>
          <span>Estoque</span>
        </RouterLink>

        <RouterLink to="/CadastroEPI" class="menu-item" active-class="active">
          <i class="fas fa-boxes"></i>
          <span>Cadastro EPI</span>
        </RouterLink>

        <RouterLink to="/Entrega" class="menu-item" active-class="active">
          <i class="fas fa-boxes"></i>
          <span>Entrega EPI</span>
        </RouterLink>

        <RouterLink to="/cadastrofun" class="menu-item" active-class="active">
          <i class="fas fa-id-card"></i>
          <span>Cadastro Funcionário</span>
        </RouterLink>
      </nav>

      <button @click="sair" class="botao-sair">
        <i class="fas fa-sign-out-alt"></i>
        <span>Sair</span>
      </button>
    </aside>
    

    <main class="conteudo">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { useSupabase } from '../composables/useSupabase'
import { useRouter } from 'vue-router'
import { RouterLink, RouterView } from 'vue-router'

const { supabase } = useSupabase()
const router = useRouter()

async function sair() {
  try {
    await supabase.auth.signOut()
    router.push('/login')
  } catch (err) {
    console.error('Erro ao fazer logout:', err)
  }
}
</script>

<style scoped>
/* ===== ESTILOS GERAIS ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.shell {
  display: flex;
  height: 100vh;
  background-color: #FFFFFF;
}

.sidebar {
  width: 250px;
  background-color: #790909;
  color: #FFFFFF;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow-y: auto;
}

/* ===== LOGO ===== */
.logo {
  font-size: 20px; /* Reduzi levemente para caber melhor ao lado da imagem */
  font-weight: 800;
  color: #FFFFFF;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Alinha o bloco à esquerda para ficar mais elegante */
  gap: 12px;
  padding-left: 5px;
}

/* Estilização da imagem da logo */
.logo-img {
  height: 45px;          /* Altura ideal para destacar o escudo */
  width: 40px;           /* Mantém a proporção 1:1 já que ela é redonda */
  border-radius: 50%;    /* Garante que fique perfeitamente circular */
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.2); /* Uma bordinha sutil para destacar do fundo */
}

.menu {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  color: #FFFFFF;
  text-decoration: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  gap: 12px;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.menu-item.active {
  background-color: rgba(255, 255, 255, 0.2);
  font-weight: 600;
  border-left: 4px solid #FFFFFF;
  padding-left: 16px;
}

.menu-item i {
  font-size: 20px;
  width: 24px;
  text-align: center;
}

.botao-sair {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
  border: none;
  padding: 12px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  width: 100%;
}

.botao-sair:hover {
  background-color: rgb(255, 145, 0);
}

.botao-sair:active {
  transform: scale(0.98);
}

.botao-sair i {
  font-size: 18px;
}

.conteudo {
  flex-grow: 1;
  margin-left: 250px;
  padding: 30px;
  overflow-y: auto;
  background-color: #afafaf;
}

/* ===== RESPONSIVIDADE ===== */
@media (max-width: 768px) {
  .sidebar {
    width: 200px;
  }

  .conteudo {
    margin-left: 200px;
    padding: 20px;
  }

  .logo {
    font-size: 16px;
    margin-bottom: 30px;
    gap: 8px;
  }

  .logo-img {
    height: 35px;
    width: 35px;
  }

  .menu-item {
    padding: 12px 15px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .sidebar {
    width: 100%;
    position: absolute;
    height: auto;
  }

  .conteudo {
    margin-left: 0;
    padding: 15px;
  }
}
</style>