<template>
  <div class="pagina-Funcionarios">
    <div class="header-pagina">
      <h2>Listagem de Funcionários</h2>
      <router-link to="/cadastrofun" class="btn-adicionar"> + Novo Funcionário</router-link>
    </div>

      <section class="card-table">
        <table class="styled-table">
          <thead>
            <tr>
              <th>Colaborador</th>
              <th>Matrícula</th>
              <th>Setor / Cargo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="f in funcionarios" :key="f.id">
              <td><span class="text-bold">{{ f.nome }}</span></td>
              <td>{{ f.matricula }}</td>
                <span class="badge">{{ f.setor }}</span>
                <span class="cargo-text">{{ f.cargo }}</span>
              <td class="text-center">
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useSupabase } from '../composables/useSupabase'

const { supabase } = useSupabase()


// Variáveis que controlam os dados na tela
const funcionarios = ref([]);
const editandoId = ref(null);
const form = reactive({ 
  nome: '', 
  matricula: '', 
  setor: '', 
  cargo: '',
  cpf: ''
});

// Busca os dados do Supabase
const carregar = async () => {
  const { data, error } = await supabase.from('funcionarios').select('*').order('nome');
  if (error) {
    console.error("Erro ao carregar:", error.message);
  } else {
    funcionarios.value = data || [];
  }
};

// Salva um novo ou atualiza um existente
const salvar = async () => {
  if (editandoId.value) {
    // Modo de Edição (Update)
    await supabase.from('funcionarios').update(form).eq('id', editandoId.value);
  } else {
    // Modo de Criação (Insert)
    await supabase.from('funcionarios').insert([form]);
  }
  cancelarEdicao();
  carregar();
};

// Prepara o formulário para edição ao clicar no botão
const prepararEdicao = (f) => {
  editandoId.value = f.id;
  Object.assign(form, { 
    nome: f.nome, 
    matricula: f.matricula, 
    setor: f.setor, 
    cargo: f.cargo,
    cpf: f.cpf
  });
};

// Deleta um registro
const excluir = async (id) => {
  if (confirm('Deseja realmente remover este registro?')) {
    await supabase.from('funcionarios').delete().eq('id', id);
    carregar();
  }
};

// Limpa o formulário e sai do modo de edição
const cancelarEdicao = () => {
  editandoId.value = null;
  Object.assign(form, { nome: '', matricula: '', cpf: '', setor: '', cargo: '' });
};


// Inicia a busca de dados assim que a tela abre
onMounted(carregar);
</script>

<style scoped>
.pagina-funcionarios {
  padding: 20px;
}

.header-pagina {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-pagina h2 {
  color: #333;
}

.btn-adicionar {
  background-color: #790909; /* Cor da sua sidebar */
  color: white;
  border: 2px solid crimson;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-adicionar:hover {
  background-color: #ff0000;
  border-color: #ff0000;
}
.styled-table {
  width: 100%;
  border-collapse: collapse;
}
.styled-table th, .styled-table td {
  padding: 15px 18px;
  border-bottom: 1px solid #eee;
}
.styled-table th {
  background-color: #740000;
  color: #ffffff;
}

.tabela-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #740000;
  color: #ffffff;
}

.btn-acao {
  background: transparent;
  border: 1px solid #790909;
  color: #790909;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.card-table td {
  padding: 16px 24px;
}

.card-form, .card-table { background: white; border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
.text-bold { font-weight: 600; color: #0f172a; }
.badge { padding: 3px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; background-color: #e0e7ff; color: #3730a3; }
.cargo-text { font-size: 0.75rem; color: #64748b; margin-top: 4px; }
.styled-table> {
  width: 100%;
  border-collapse: collapse;
}
</style>