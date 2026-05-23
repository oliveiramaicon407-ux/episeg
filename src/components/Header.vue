<template>
  <header class="header">
    <img class="logo" src="../assets/logo.png" alt="Logo" />
    <nav class="nav-ul">
      <router-link to="cadastro" class="btn btn-cadastrar">
        Cadastro
      </router-link>
      <router-link to="login" class="btn btn-entrar"> 
        Entrar 
      </router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  height: 70px; /* Aumentado levemente para melhor respiro */
  background: #3b3838;
  border-bottom: 1px solid #4a4a4a;
}

.logo {
  height: 3.5rem;
  width: auto; /* Mantém a proporção da logo */
}

.nav-ul {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

/* Estilo Base para os Botões */
.btn {
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.6rem 1.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: inline-block;
  cursor: pointer;
  border: 2px solid transparent;
}

/* Estilo específico: Entrar (Destaque Principal) */
.btn-entrar {
  background-color: #15b800;
  color: #ffffff;
}

.btn-entrar:hover {
  background-color: #b30000;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Estilo específico: Cadastrar (Outline) */
.btn-cadastrar {
  background-color: transparent;
  color: #f0ede8;
  border-color: #f0ede8;
}

.btn-cadastrar:hover {
  background-color: #f0ede8;
  color: #3b3838;
}
</style>