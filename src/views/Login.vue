<template>

  <div class="container-login">
    <! -- Botão de Voltar -->
    <div style="position: absolute; top: 20px; left: 20px;">
      <button class="btn btn-outline" @click="$router.push('/')">
        ← Voltar
      </button>
    </div>


    <div class="form-box">
      <h1 class="titulo">Sistema de EPI</h1>
      <p class="subtitulo">Faça login para acessar o sistema</p>

      <form @submit.prevent="fazerLogin" class="formulario">

        <div class="form-group">
          <label for="email" class="label">E-mail</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="seu@email.com"
            class="input"
            required
          />
        </div>

        <div class="form-group">
          <label for="senha" class="label">Senha</label>
          <input
            id="senha"
            v-model="senha"
            type="password"
            placeholder="Digite sua senha"
            class="input"
            required
          />
        </div>

        <div v-if="erro" class="mensagem-erro">
          <i class="fas fa-exclamation-circle"></i>
          {{ erro }}
        </div>

        <button
          type="submit"
          class="botao-entrar"
          :disabled="carregando"
        >

          <i v-if="carregando" class="fas fa-spinner fa-spin"></i>

          <span v-else>Entrar</span>
        </button>
      </form>

      <p class="dica">
        <strong>Dica:</strong> Use um e-mail e senha válidos cadastrados no Supabase.
      </p>
    </div>
  </div>
</template>

<script setup>

import { ref } from 'vue'
import { useSupabase } from '../composables/useSupabase'
import { useRouter } from 'vue-router'


const { supabase } = useSupabase()


const router = useRouter()


const email = ref('')

const senha = ref('')

const erro = ref('')

const carregando = ref(false)

async function fazerLogin() {

  erro.value = ''


  if (!email.value || !senha.value) {

    erro.value = 'Por favor, preencha todos os campos'

    return

  }

  carregando.value = true

  try {

    const { error } = await supabase.auth.signInWithPassword({

      email: email.value,

      password: senha.value
    })

    if (error) {

      erro.value = 'E-mail ou senha incorretos. Tente novamente.'

      carregando.value = false

    }


       router.push('/funcionarios')

  }

  catch (err) {

    erro.value = 'Erro ao fazer login. Tente novamente mais tarde.'

    console.error('Erro ao fazer login:', err)

    carregando.value = false
  }
}
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}


.container-login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url("../assets/construcao.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding: 20px;
}

.btn-outline {
  position: absolute;
  top: 20px;
  left: 30px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: #ffffff;
  color: #1a1a1a;
  border: 1px solid #ffffff;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.btn-outline:hover {
  background-color: #b1b1b1;
  transform: scale(1.05);
}
.btn-outline:active {
  transform: translateY(0);
}

.form-box {
  width: 100%;
  max-width: 450px;
  padding: 50px 40px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  background-color: #FFFFFF;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}


.titulo {
  font-size: 32px;
  color: #000000;
  font-weight: 700;
  margin-bottom: 8px;
  text-align: center;
}


.subtitulo {
  font-size: 16px;
  color: #1A1A1A;
  text-align: center;
  margin-bottom: 40px;
}


.formulario {
  display: flex;
  flex-direction: column;
  gap: 24px;
}


.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}


.label {
  font-size: 14px;
  font-weight: 600;
  color: #e00505;
}


.input {
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 4px;
  font-size: 16px;
  color: #1A1A1A;
  background-color: #FFFFFF;
  transition: all 0.3s ease;
}


.input:focus {
  outline: none;
  border-color: #e00000;
  box-shadow: 0 0 0 3px rgba(0, 61, 153, 0.1);
}

.mensagem-erro {
  padding: 12px 16px;
  background-color: #FEE2E2;
  border: 1px solid #FECACA;
  border-radius: 4px;
  color: #DC2626;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.mensagem-erro i {
  font-size: 18px;
}


.botao-entrar {
  padding: 12px 24px;
  background-color: #8a9900;
  color: #FFFFFF;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
}

.botao-entrar:hover:not(:disabled) {
  background-color: #e4bd12;
}

.botao-entrar:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.dica {
  font-size: 13px;
  color: #6B7280;
  text-align: center;
  margin-top: 20px;
  line-height: 1.5;
}

@media (max-width: 600px) {
  .form-box {
    padding: 30px 20px;
  }

  .titulo {
    font-size: 24px;
  }

  .subtitulo {
    font-size: 14px;
  }
}
</style>

<style scoped>
.auth-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-image: url('@/assets/acessorios.png');

}
</style>