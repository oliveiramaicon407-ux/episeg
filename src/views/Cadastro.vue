<template>
  <div class="container-Cadastro">
    <div style="position: absolute; top: 20px; left: 20px;">
      <button class="btn btn-outline" @click="$router.push('/')">
        ← Voltar
      </button>
    </div>

    <div class="form-box">
      <h1 class="titulo">Sistema de EPI</h1>
      <p class="subtitulo">Faça o cadastro para acessar o sistema</p>

      <form @submit.prevent="fazerCadastro" class="formulario">
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

        <div class="form-group">
          <label for="confirmar-senha" class="label">Confirmar Senha</label>
          <input
            id="confirmar-senha"
            v-model="confirmarSenha" 
            type="password"
            placeholder="Digite sua senha novamente"
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
          class="botao-Cadastrar"
          :disabled="carregando"
        >
          <i v-if="carregando" class="fas fa-spinner fa-spin"></i>
          <span v-else>Cadastrar</span>
        </button>
      </form>

      <!-- Corrigido o nome da classe inválida para evitar bugs de CSS -->
      <p class="ja-tem-conta">
        <strong>Já tem uma conta?</strong> <a href="/login">Faça login</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSupabase } from '../composables/useSupabase'
import { useRouter } from 'vue-router'

// Importando a imagem corretamente para o padrão exigido pelo Vite 7
import segurancaImg from '../assets/seguranca.jpg'

const { supabase } = useSupabase()
const router = useRouter()

const email = ref('')
const senha = ref('')
const confirmarSenha = ref('')

const erro = ref('')
const carregando = ref(false)

async function fazerCadastro() {
  erro.value = ''

  if (!email.value || !senha.value || !confirmarSenha.value) {
    erro.value = 'Por favor, preencha todos os campos'
    return
  }

  if (senha.value !== confirmarSenha.value) {
    erro.value = 'As senhas não coincidem. Por favor, tente novamente.'
    return
  }

  carregando.value = true

  try {
    // Corrigido: Alterado de signInWithPassword para signUp para criar o usuário corretamente no Supabase
    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: senha.value
    })

    if (error) {
      erro.value = 'Erro ao realizar o cadastro: ' + error.message
      carregando.value = false
      return
    }

    router.push('/cadastrofun')
  }
  catch (err) {
    erro.value = 'Erro ao fazer cadastro. Tente novamente mais tarde.'
    console.error('Erro ao fazer cadastro:', err)
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

.container-Cadastro {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url("../assets/seguranca.jpg");
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

.botao-Cadastrar {
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

.botao-Cadastrar:hover:not(:disabled) {
  background-color: #e4bd12;
}

.botao-Cadastrar:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.ja-tem-conta {
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

/* Unifiquei o bloco extra aqui e aplicando o v-bind reativo correto */
.auth-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-image: v-bind("`url(${segurancaImg})`");
}
</style>