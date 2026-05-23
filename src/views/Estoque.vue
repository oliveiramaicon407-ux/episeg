<template>
  <div class="layout-container">
    <header class="header-section flex-between">
      <div>
        <h1>Controle de Estoque</h1>
        <p>Gerencie o saldo e a disponibilidade de cada EPI.</p>
      </div>
      <button class="btn btn-outline flex-center" @click="carregar" :disabled="loading">
        Atualizar
      </button>
    </header>

    <div class="card-form">
      <div class="card-header flex-between">
        <h2>{{ modoEdicao ? 'Ajustar Quantidade' : 'Novo Item no Estoque' }}</h2>
        <button class="btn-link" @click="alternarModo">
          {{ modoEdicao ? '+ Adicionar EPI do Catálogo' : '← Voltar para Ajuste' }}
        </button>
      </div>
      
      <div class="main-form">
        <div class="form-row">
          <div class="form-group">
            <label>Equipamento (EPI)</label>
            <select v-model="form.id_selecionado" class="custom-select">
              <option value="">Selecione um equipamento...</option>
              
              <template v-if="modoEdicao">
                <option v-for="item in estoque" :key="item.id" :value="item.id">
                  {{ item.epis?.equipamentos }} (Atual: {{ item.quantidade }})
                </option>
              </template>

              <template v-else>
                <option v-for="epi in listaCatalogos" :key="epi.id" :value="epi.id">
                  {{ epi.equipamentos }} (CA: {{ epi.ca }})
                </option>
              </template>
            </select>
          </div>
          <div class="form-group">
            <label>Quantidade</label>
            <input type="number" v-model.number="form.quantidade" min="0" />
          </div>
        </div>

        <div class="action-bar">
          <button class="btn btn-primary" @click="salvar" :disabled="!form.id_selecionado || loading">
            {{ modoEdicao ? 'Salvar Alteração' : 'Adicionar ao Estoque' }}
          </button>
        </div>

        <p class="error-msg" v-if="erro">⚠ {{ erro }}</p>
        <p class="success-msg" v-if="ok">✓ Sucesso!</p>
      </div>
    </div>

    <div class="card-table">
      <div class="table-container">
        <table class="styled-table">
          <thead>
            <tr>
              <th>EPI / CA</th>
              <th>Quantidade</th>
              <th class="text-center">Situação</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in estoque" :key="item.id">
              <td>
                <div class="text-bold">{{ item.epis?.equipamentos }}</div>
                <div class="cargo-text">CA: {{ item.epis?.ca }}</div>
              </td>
              <td class="text-bold">{{ item.quantidade }}</td>
              <td class="text-center">
                <span :class="badgeClass(item.quantidade)">
                  {{ item.quantidade <= 0 ? 'Sem estoque' : item.quantidade < 10 ? 'Baixo' : 'OK' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useSupabase } from '../composables/useSupabase';

const { supabase } = useSupabase();
const estoque = ref([])
const listaCatalogos = ref([]) 
const loading = ref(true)
const erro = ref('')
const ok = ref(false)
const modoEdicao = ref(true)
const form = ref({ id_selecionado: '', quantidade: 0 })

// RECURSO EXTRA: Quando o usuário selecionar um EPI no modo de ajuste, preenche o input automaticamente com a quantidade atual dele
watch(() => form.value.id_selecionado, (novoId) => {
  if (modoEdicao.value && novoId) {
    const itemCorrespondente = estoque.value.find(i => i.id === novoId)
    if (itemCorrespondente) {
      form.value.quantidade = itemCorrespondente.quantidade
    }
  }
})

function alternarModo() {
  modoEdicao.value = !modoEdicao.value
  form.value = { id_selecionado: '', quantidade: 0 }
}

async function carregar() {
  loading.value = true
  erro.value = ''

  // 1. Puxa itens do estoque
  // AJUSTADO: Mudado 'nome' para 'equipamentos' dentro do relacionamento de epis(...)
  const { data: est, error: errorEstoque } = await supabase
    .from('estoque')
    .select('id, quantidade, epi_id, epis(id, equipamentos, ca, descricao)')

  if (errorEstoque) console.error("Erro estoque:", errorEstoque.message)
  
  // 2. Puxa todos os EPIs da tabela 'epis'
  // AJUSTADO: Mudado .order('nome') para .order('equipamentos')
  const { data: cat, error: errorCatalogo } = await supabase
    .from('epis')
    .select('*')
    .order('equipamentos', { ascending: true });

  if (errorCatalogo) console.error("Erro catálogo:", errorCatalogo.message)

  estoque.value = est || []
  listaCatalogos.value = cat || []
  loading.value = false
}

async function salvar() {
  erro.value = ''; ok.value = false;
  loading.value = true
  
  if (modoEdicao.value) {
    // Atualiza a linha na tabela estoque baseado no ID do estoque
    const { error } = await supabase
      .from('estoque')
      .update({ quantidade: form.value.quantidade })
      .eq('id', form.value.id_selecionado)
    if (error) erro.value = error.message
  } else {
    // No modo novo cadastro, o form.id_selecionado guarda o ID do EPI do catálogo
    const existe = estoque.value.find(i => i.epi_id === form.value.id_selecionado)
    if (existe) {
      erro.value = "Este item já está no estoque. Use o modo 'Ajustar'."
      loading.value = false
      return
    }

    // Insere novo registro associando ao ID do catálogo
    const { error } = await supabase
      .from('estoque')
      .insert([{ epi_id: form.value.id_selecionado, quantidade: form.value.quantidade }])
    if (error) erro.value = error.message
  }

  loading.value = false

  if (!erro.value) {
    ok.value = true
    await carregar()
    form.value = { id_selecionado: '', quantidade: 0 }
  }
}

const badgeClass = (q) => q <= 0 ? 'badge badge-danger' : q < 10 ? 'badge badge-warn' : 'badge badge-ok'

onMounted(carregar)
</script>

<style scoped>
.layout-container { max-width: 900px; margin: 0 auto; padding: 20px; font-family: sans-serif; }
.flex-between { display: flex; justify-content: space-between; align-items: center; }
.card-form, .card-table { background: white; border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
.form-row { display: grid; grid-template-columns: 2fr 1fr; gap: 15px; margin-bottom: 15px; }
.form-group { display: flex; flex-direction: column; }
.custom-select, input { padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-top: 5px; }
.btn { padding: 10px 15px; border-radius: 5px; cursor: pointer; border: 1px solid #ffffff; }
.btn-primary { background: #2563eb; color: white; }
.btn-primary:hover { background-color: #1d4ed8; transform: scale(1.05); }
.btn-link { background: none; border: none; color: #2563eb; text-decoration: underline; cursor: pointer; }
.error-msg { color: #b00020; margin-top: 10px; }
.success-msg { color: #166534; margin-top: 10px; }
.table-container { overflow-x: auto; }
.styled-table { width: 100%; border-collapse: collapse; }
.styled-table th { background: #f8fafc; padding: 12px 20px; text-align: left; font-size: 0.75rem; color: #64748b; text-transform: uppercase; border-bottom: 2px solid #e2e8f0; }
.styled-table td { padding: 12px 20px; border-bottom: 1px solid #f1f5f9; }
.text-bold { font-weight: bold; }
.cargo-text { font-size: 0.8rem; color: #666; } 
.btn-outline { background: rgb(0, 199, 10); border: 1px solid #06c200; }
.btn-outline {
  display: inline-block;
  margin-top: 0.5rem;
  padding: 1rem 2rem;      /* Aumenta o tamanho interno do botão */
  font-size: 0.875rem;       /* Aumenta o texto */
  font-weight: bold;
  color: #ffffff;
  background-color: #35a700; /* Cor laranja que você usou nos passos */
  border-radius: 8px;
  text-decoration: none;   /* Remove o sublinhado do link */
  transition: transform 0.2s, background-color 0.2s;
  border: none;
  cursor: pointer;
}

/* Efeito ao passar o mouse */
.btn-outline:hover {
  background-color: #0042bd;
  transform: scale(1.05); /* Dá um leve zoom ao passar o mouse */
}
.btn-link { background: none; border: none; color: #2563eb; text-decoration: underline; cursor: pointer; }
.btn-link {
  display: inline-block;
  margin-top: 0.5rem;
  padding: 0.4rem 1rem;      /* Aumenta o tamanho interno do botão */
  font-size: 0.775rem;       /* Aumenta o texto */
  font-weight: bold;
  color: #ffffff;
  background-color: #35a700; /* Cor laranja que você usou nos passos */
  border-radius: 8px;
  text-decoration: none;   /* Remove o sublinhado do link */
  transition: transform 0.2s, background-color 0.2s;
  border: none;
  cursor: pointer;
}

.styled-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
.styled-table th { text-align: left; border-bottom: 2px solid #eee; padding: 10px; }
.styled-table td { padding: 10px; border-bottom: 1px solid #eee; }
.badge { padding: 3px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; }
.badge-danger { background: #fee2e2; color: #991b1b; }
.badge-warn { background: #fef9c3; color: #854d0e; }
.badge-ok { background: #dcfce7; color: #166534; }
.text-bold { font-weight: bold; }
.cargo-text { font-size: 0.8rem; color: #666; }
</style>