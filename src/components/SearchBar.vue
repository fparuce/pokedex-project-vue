<template>
  <div class="search-bar">
    <input
      type="text"
      v-model="query"
      @input="handleInput"
      placeholder="Buscar Pokémon por nome ou ID..."
      class="search-input"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const query = ref('')
const emit = defineEmits(['search'])

const handleInput = () => {
  emit('search', query.value)
}
</script>

<style scoped>
.search-bar {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 10px 15px;
  border: 2px solid #ddd;
  border-radius: 25px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #2a75bb;
}
</style>