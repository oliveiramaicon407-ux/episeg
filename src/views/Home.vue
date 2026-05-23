<template>
  <div class="layout-container">
    <Header />
    
    <main class="home">
      <section class="home__hero">
        <div class="home__hero-imagem">
          <h1>EPI</h1>
          <p>Segurança Em Primeiro Lugar</p>
          <a href="/Cadastro" class="button-Dashboard">Acessar Painel</a>
        </div>
      </section>

      <section class="home__instrucoes">
        <!-- Trocado o src fixo pelas variáveis importadas no script -->
        <img
          :src="trabalhadoresImg"
          alt="Ilustração de gestão de EPI"
          class="home__hero-img"
        />

        <img
          :src="episImg"
          alt="Ilustração de gestão de EPI"
          class="home__hero-img"
        />

        <h2>Funcionalidades</h2>
        <p>Sobre EPI's e entrega de equipamentos de proteção individual, e garantindo a segurança dos trabalhadores. </p>
      </section>
      
      <section class="home__cards">
        <img
          :src="segurancaImg"
          alt="Ilustração de gestão de EPI"
          class="home__hero-img"
        />

        <img
          :src="acessoriosImg"
          alt="Ilustração de gestão de EPI"
          class="home__hero-img"
        />

        <img
          :src="estatisticasImg"
          alt="Ilustração de gestão de EPI"
          class="home__hero-img"
        />
      </section>
    </main>

    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

// Importando as imagens como módulos para o Vite não se perder no build
import trabalhadoresImg from '../assets/trabalhadores.png'
import episImg from '../assets/epis.png'
import segurancaImg from '../assets/seguranca.png'
import acessoriosImg from '../assets/acessorios.png'
import estatisticasImg from '../assets/estastiscas.png'

export default {
  name: 'Home',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      // Disponibilizando as imagens para o template
      trabalhadoresImg,
      episImg,
      segurancaImg,
      acessoriosImg,
      estatisticasImg
    }
  }
}
</script>

<style scoped>
/* ───── Layout geral ───── */
.layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.home {
  flex: 1;
}

/* ───── Hero ───── */
.home__hero {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 8rem;
  background-image: url("../assets/trabalhadores_epis.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 40rem;
}

.home__hero-texto h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.home__hero-texto p {
  font-size: 1rem;
  color: #6b7280;
}

.home__hero-imagem {
  flex-shrink: 0;
}

/* Corrigido o agrupamento de seletores que causava erro no Scoped CSS do Vite */
.home__hero-imagem h1, 
.home__hero-imagem p {
  color: #ffffff;
}

.home__hero-img {
  width: 320px;
  max-width: 100%;
  border-radius: 12px;
}

/* ───── Cards ───── */
.home__cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 9.9rem 1rem;
  background: #ffffff;
  border: 1px solid #f0ede8;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.card--alerta {
  border-color: #fca97a;
  background: #fff7f2;
}

.card__icone {
  font-size: 2rem;
}

.card__numero {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1e3a5f;
}

.card__label {
  font-size: 0.85rem;
  color: #6b7280;
}

/* ───── Instruções ───── */
.home__instrucoes {
  margin-bottom: 3rem;
}

.home__instrucoes-titulo {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1e3a5f;
  margin-bottom: 1.5rem;
}

.home__passos {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.passo {
  background: #ffffff;
  border: 1px solid #f0ede8;
  border-radius: 12px;
  padding: 1.5rem 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.passo__numero {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #ea5b0c;
  color: #ffffff;
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.passo h3 {
  font-size: 0.95rem;
  font-weight: 600;
  color: #1e3a5f;
  margin-bottom: 0.4rem;
}

.passo p {
  font-size: 0.85rem;
  color: #6b7280;
  line-height: 1.5;
}

/* ───── Responsivo ───── */
@media (max-width: 768px) {
  .home__hero {
    flex-direction: column;
  }

  .home__cards,
  .home__passos {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .home__cards,
  .home__passos {
    grid-template-columns: 1fr;
  }
}

/* Ajuste na div que segura o texto e o botão */
.home__hero-imagem {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;
  text-align: center; 
}

.button-Dashboard {
  display: inline-block;
  margin-top: 1.5rem;
  padding: 1rem 3rem;      
  font-size: 1.5rem;       
  font-weight: bold;
  color: #ffffff;
  background-color: #ea0c0c; 
  border-radius: 8px;
  text-decoration: none;   
  transition: transform 0.2s, background-color 0.2s;
  border: none;
  cursor: pointer;
}

/* Efeito ao passar o mouse */
.button-Dashboard:hover {
  background-color: #ff6b1a;
  transform: scale(1.05); 
}
</style>