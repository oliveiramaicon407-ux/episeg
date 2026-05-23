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
           <img
            src="../assets/trabalhadores.png"
            alt="Ilustração de gestão de EPI"
            class="home__hero-img"
          />

           <img
            src="../assets/epis.png"
            alt="Ilustração de gestão de EPI"
            class="home__hero-img"
          />

          <h2>Funcionalidades</h2>
  <p>Sobre EPI's e entrega de equipamentos de proteção individual, e garantindo a segurança dos trabalhadores. </p>
      </section>
      

<section class="home__cards">

  
       <img
            src="../assets/seguranca.png"
            alt="Ilustração de gestão de EPI"
            class="home__hero-img"
          />

        <img
            src="../assets/acessorios.png"
            alt="Ilustração de gestão de EPI"
            class="home__hero-img"
          />

        <img
            src="../assets/estastiscas.png"
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

export default {
  name: 'Home',
  components: {
    Header,
    Footer
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

.home__hero-imagem h1 , p{
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
  align-items: center; /* Centraliza horizontalmente */
  justify-content: center;
  text-align: center; /* Centraliza o texto do h1 e p */
}

.button-Dashboard {
  display: inline-block;
  margin-top: 1.5rem;
  padding: 1rem 3rem;      /* Aumenta o tamanho interno do botão */
  font-size: 1.5rem;       /* Aumenta o texto */
  font-weight: bold;
  color: #ffffff;
  background-color: #ea0c0c; /* Cor laranja que você usou nos passos */
  border-radius: 8px;
  text-decoration: none;   /* Remove o sublinhado do link */
  transition: transform 0.2s, background-color 0.2s;
  border: none;
  cursor: pointer;
}

/* Efeito ao passar o mouse */
.button-Dashboard:hover {
  background-color: #ff6b1a;
  transform: scale(1.05); /* Dá um leve zoom ao passar o mouse */
}

</style>