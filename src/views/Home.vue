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

      <section class="home__destaques-imagens">
        <div class="destaque-wrapper">
          <img :src="trabalhadoresImg" alt="Trabalhadores usando EPIs" @error="imagemQuebrada" />
        </div>
        <div class="destaque-wrapper">
          <img :src="episImg" alt="Equipamentos" @error="imagemQuebrada" />
        </div>
      </section>

      <section class="home__secao-titulo">
        <h2>Funcionalidades</h2>
        <p>Sobre EPI's e entrega de equipamentos de proteção individual, garantindo a segurança dos trabalhadores.</p>
      </section>
      
      <section class="home__cards-grid">
        
        <div class="card-informativo">
          <div class="card-img-box">
            <img :src="segurancaImg" alt="Segurança" @error="imagemQuebrada" />
          </div>
          <h3>Segurança e confiabilidade</h3>
          <p>O site conta com sistema seguro, rastreabilidade e entrega de equipamentos.</p>
        </div>

        <div class="card-informativo">
          <div class="card-img-box">
            <img :src="acessoriosImg" alt="Eficiência" @error="imagemQuebrada" />
          </div>
          <h3>Eficiência na gestão de EPIs</h3>
          <p>Ferramenta de EPIs que possibilita cadastrar, consultar, armazenar, e consultar entrega de materiais.</p>
        </div>

        <div class="card-informativo">
          <div class="card-img-box">
            <img :src="estatisticasImg" alt="Controle" @error="imagemQuebrada" />
          </div>
          <h3>Controle de equipamentos</h3>
          <p>Controle de custo com EPIs através de relatórios que geram informações detalhadas dos gráficos e durabilidade.</p>
        </div>

      </section>
    </main>

    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

// Importações oficiais das imagens. 
// ATENÇÃO: Verifique se os nomes na sua pasta 'src/assets' estão idênticos a estes abaixo!
import trabalhadoresImg from '../assets/trabalhadores.png'
import episImg from '../assets/epis.png'
import segurancaImg from '../assets/seguranca.png'
import acessoriosImg from '../assets/acessorios.png'
import estatisticasImg from '../assets/estastiscas.png' // mantido o nome anterior por segurança

export default {
  name: 'Home',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      trabalhadoresImg,
      episImg,
      segurancaImg,
      acessoriosImg,
      estatisticasImg
    }
  },
  methods: {
    // Função auxiliar: Se alguma imagem falhar, ela avisa no console do F12 em vez de quebrar o app
    imagemQuebrada(event) {
      console.warn("Alerta: Não foi possível carregar a imagem:", event.target.src);
    }
  }
}
</script>

<style scoped>
/* ───── Layout Geral ───── */
.layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #ededed;
}

.home {
  flex: 1;
}

/* ───── Seção Hero (Inalterada) ───── */
.home__hero {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  background-image: url("../assets/trabalhadores_epis.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 40rem;
}

.home__hero-imagem {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;
  text-align: center; 
}

.home__hero-imagem h1, 
.home__hero-imagem p {
  color: #ffffff;
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

.button-Dashboard:hover {
  background-color: #ff6b1a;
  transform: scale(1.05); 
}

/* ───── Imagens Grandes de Destaque ───── */
.home__destaques-imagens {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0px;
  width: 100%;
  margin-bottom: 4rem;
}

.destaque-wrapper {
  width: 100%;
  height: 450px;
  overflow: hidden;
}

.destaque-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ───── Título de Funcionalidades ───── */
.home__secao-titulo {
  text-align: left;
  max-width: 1200px;
  margin: 0 auto 2rem auto;
  padding: 0 2rem;
}

.home__secao-titulo h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #333333;
  margin-bottom: 0.5rem;
}

.home__secao-titulo p {
  font-size: 1rem;
  color: #666666;
}

/* ───── Grid de Cards Brancos ───── */
.home__cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto 5rem auto;
  padding: 0 2rem;
}

.card-informativo {
  background: #ffffff;
  border-radius: 8px;
  padding: 2.5rem 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.galeria-card:hover .img-wrapper img {
  transform: scale(1.05);
}

.galeria-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.card-img-box {
  width: 100%;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.card-img-box img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.card-informativo h3 {
  font-size: 1.2rem;
  font-weight: 700;
  color: #111111;
  margin-bottom: 0.8rem;
}

.card-informativo p {
  font-size: 0.9rem;
  color: #666666;
  line-height: 1.5;
}

/* ───── Responsividade ───── */
@media (max-width: 900px) {
  .home__cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .home__destaques-imagens {
    grid-template-columns: 1fr;
  }
  
  .destaque-wrapper {
    height: 300px;
  }

  .home__cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>