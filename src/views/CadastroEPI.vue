<template>
  <div class="layout-container">
    
    <header class="header-section">
      <h1>Cadastro de EPIs</h1>
      <p>Gerencie o catálogo de Equipamentos de Proteção Individual e C.A.</p>
    </header>

    <main class="content">
      <section class="card-form">
        <div class="card-header">
          <h3>{{ editandoId ? 'Editar Equipamento' : 'Novo Equipamento' }}</h3>
        </div>
        
        <form @submit.prevent="salvar" class="main-form">
          <div class="form-row">
            <div class="form-group">
              <label>Nome do EPI</label>
              <input v-model="form.equipamentos" type="text" placeholder="Ex: Capacete de Segurança" required>
            </div>
            <div class="form-group">
              <label>Número do C.A.</label>
              <input v-model="form.ca" type="text" placeholder="Ex: 12345" required>
            </div>
          </div>

          <div class="form-group" style="margin-bottom: 20px;">
            <label>Descrição / Especificações</label>
            <input v-model="form.descricao" type="text" placeholder="Ex: Classe B, com jugular">
          </div>
          
          <div class="form-group" style="margin-bottom: 20px;">
            <label>Quantidade</label>
            <input v-model="form.quantidade" type="number" placeholder="Ex: 10" required>
          </div>

          <div class="action-bar">
            <button type="submit" class="btn btn-primary">
              {{ editandoId ? 'Salvar Alterações' : 'Cadastrar EPI' }}
            </button>
            <button v-if="editandoId" type="button" @click="cancelarEdicao" class="btn btn-outline">
              Cancelar
            </button>
          </div>
        </form>
      </section>

      <section class="card-table">
        <table class="styled-table">
          <thead>
            <tr>
              <th>Equipamentos</th>
              <th>C.A.</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th class="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="e in epis" :key="e.id">
              <td><span class="text-bold">{{ e.equipamentos }}</span></td>
              <td><span class="badge-ca">{{ e.ca }}</span></td>
              <td>{{ e.descricao }}</td>
              <td>{{ e.quantidade }}</td>
              <td class="text-center">
                <button @click="prepararEdicao(e)" class="btn-action edit">Editar</button>
                <button @click="excluir(e.id)" class="btn-action delete">Excluir</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useSupabase } from '../composables/useSupabase';
const { supabase } = useSupabase();

const epis = ref([]);
const editandoId = ref(null);

// AJUSTADO: Propriedade inicializada como 'equipamentos'
const form = reactive({ equipamentos: '', ca: '', descricao: '', quantidade: '' });

// Busca os EPIs no banco
const carregar = async () => {
  // AJUSTADO: .order('equipamentos') agora busca o nome real da coluna
  const { data, error } = await supabase.from('epis').select('*').order('equipamentos', { ascending: true });
  if (error) console.error("Erro ao carregar:", error.message);
  epis.value = data || [];
};

const cancelarEdicao = () => {
  editandoId.value = null;
  form.equipamentos = '';
  form.ca = '';
  form.descricao = '';
  form.quantidade = '';
};

const prepararEdicao = (epi) => {
  editandoId.value = epi.id;
  // AJUSTADO: Coleta 'equipamentos' vindo do banco
  form.equipamentos = epi.equipamentos ?? '';
  form.ca = epi.ca ?? '';
  form.descricao = epi.descricao ?? '';
  form.quantidade = epi.quantidade ?? '';
};

const excluir = async (id) => {
  if (!confirm('Tem certeza que deseja excluir este EPI?')) return;
  const { error } = await supabase.from('epis').delete().eq('id', id);
  if (error) {
    console.error('Erro ao excluir:', error.message);
    alert('Erro ao excluir: ' + error.message);
    return;
  }
  if (editandoId.value === id) cancelarEdicao();
  carregar();
};

// Salva ou Atualiza
const salvar = async () => {
  const dadosParaEnviar = {
    equipamentos: form.equipamentos, // AJUSTADO
    ca: form.ca,
    descricao: form.descricao,
    quantidade: Number(form.quantidade)
  };

  try {
    if (editandoId.value) {
      const { error } = await supabase
        .from('epis')
        .update(dadosParaEnviar)
        .eq('id', editandoId.value);
      
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('epis')
        .insert([dadosParaEnviar]);
      
      if (error) throw error;
    }

    cancelarEdicao();
    carregar();
} catch (error) {
  // Mude de error.message para o objeto error completo:
  console.error("Erro completo do Supabase:", error); 
  alert("Erro ao salvar: " + (error.message || error.details));
}
};

onMounted(carregar);
</script>

<style scoped>
/* Aproveitando o estilo anterior para manter o padrão */
.layout-container { max-width: 1000px; margin: 0 auto; padding: 30px; background-color: #f8fafc; min-height: 100vh; font-family: sans-serif; }
.header-section { margin-bottom: 25px; }
.card-form, .card-table { background: #fff; border-radius: 10px; border: 1px solid #e2e8f0; margin-bottom: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); overflow: hidden; }
.card-header { background: #f1f5f9; padding: 12px 20px; border-bottom: 1px solid #e2e8f0; font-weight: bold; }
.main-form { padding: 20px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px; }
.form-group { display: flex; flex-direction: column; gap: 5px; }
label { font-size: 0.8rem; font-weight: 700; color: #475569; }
input { padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; }
.btn { padding: 10px 20px; border-radius: 6px; cursor: pointer; border: none; font-weight: bold; }
.btn-primary { background: #2563eb; color: white; }
.btn-primary:hover { background-color: #1d4ed8; transform: scale(1.05); }
.btn-outline { background: white; color: #64748b; border: 1px solid #cbd5e1; }
.styled-table { width: 100%; border-collapse: collapse; }
.styled-table th { background: #f8fafc; padding: 12px 20px; text-align: left; font-size: 0.75rem; color: #64748b; text-transform: uppercase; border-bottom: 2px solid #e2e8f0; }
.styled-table td { padding: 12px 20px; border-bottom: 1px solid #f1f5f9; font-size: 0.9rem; }
.badge-ca { background: #fee2e2; color: #991b1b; padding: 2px 8px; border-radius: 6px; font-weight: bold; }
.edit { color: #149c07; cursor: pointer; background: none; border: none; font-weight: bold; margin-right: 10px; }
.edit {
  display: inline-block;
  margin-top: 0.2rem;
  padding: 0.2rem 0.2rem;      /* Aumenta o tamanho interno do botão */
  font-size: 0.875rem;       /* Aumenta o texto */
  font-weight: bold;
  color: #ffffff;
  background-color: #149c07; /* Cor laranja que você usou nos passos */
  border-radius: 8px;
  text-decoration: none;   /* Remove o sublinhado do link */
  transition: transform 0.2s, background-color 0.2s;
  border: none;
  cursor: pointer;
}

/* Efeito ao passar o mouse */
.edit:hover {
  background-color: #0d6d00;
  transform: scale(1.05); /* Dá um leve zoom ao passar o mouse */
}

.delete { color: #be123c; cursor: pointer; background: none; border: none; font-weight: bold; }
.delete {
  display: inline-block;
  margin-top: 0.2rem;
  padding: 0.2rem 0.2rem;
  font-size: 0.875rem;
  font-weight: bold;
  color:#ffffff;
  background-color: #be123c;
  border-radius: 8px;
  text-decoration: none;
  transition: transform 0.2s, background-color 0.2s;
  border: none;
  cursor: pointer;
}

.delete:hover {
  background-color: #b60000;
  transform: scale(1.05);
}

.text-center { text-align: center; }
</style>