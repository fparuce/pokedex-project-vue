<template>
  <div class="pokemon-card" @click="$emit('click')">
    <img :src="pokemon.sprite" :alt="pokemon.name" class="pokemon-image">
    <div class="pokemon-info">
      <span class="pokemon-id">#{{ pokemon.id.toString().padStart(3, '0') }}</span>
      <h3 class="pokemon-name">{{ pokemon.name }}</h3>
      <div class="pokemon-types">
        <TypeBadge v-for="type in pokemon.types" :key="type" :type="type" />
      </div>
    </div>
  </div>
</template>

<script setup>
import TypeBadge from './TypeBadge.vue'

defineProps({
  pokemon: {
    type: Object,
    required: true
  }
})

defineEmits(['click'])
</script>

<style scoped>
.pokemon-card {
  background: white;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
}

.pokemon-card:hover {
  transform: translateY(-5px);
}

.pokemon-image {
  width: 100%;
  height: auto;
  background: #f2f2f2;
  border-radius: 8px;
}

.pokemon-info {
  margin-top: 10px;
}

.pokemon-id {
  color: #666;
  font-size: 0.8rem;
}

.pokemon-name {
  margin: 5px 0;
  color: #333;
  text-transform: capitalize;
}

.pokemon-types {
  display: flex;
  gap: 5px;
  margin-top: 5px;
}
</style>