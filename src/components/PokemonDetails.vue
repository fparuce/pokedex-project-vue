<template>
  <div class="pokemon-details">
    <div class="pokemon-header">
      <h2 class="pokemon-name">{{ pokemon.name }}</h2>
      <span class="pokemon-id">#{{ pokemon.id.toString().padStart(3, '0') }}</span>
    </div>
    
    <div class="pokemon-main">
      <div class="pokemon-image-container">
        <img :src="pokemon.sprite" :alt="pokemon.name" class="pokemon-image">
        <div class="pokemon-types">
          <TypeBadge v-for="type in pokemon.types" :key="type" :type="type" />
        </div>
      </div>
      
      <div class="pokemon-stats">
        <h3>Estatísticas</h3>
        <div class="stat" v-for="stat in pokemon.stats" :key="stat.name">
          <span class="stat-name">{{ stat.name }}</span>
          <div class="stat-bar-container">
            <div 
              class="stat-bar" 
              :style="{ width: `${(stat.value / 255) * 100}%`, backgroundColor: getStatColor(stat.name) }"
            ></div>
            <span class="stat-value">{{ stat.value }}</span>
          </div>
        </div>
        
        <div class="pokemon-meta">
          <div>
            <h4>Altura</h4>
            <p>{{ pokemon.height }} m</p>
          </div>
          <div>
            <h4>Peso</h4>
            <p>{{ pokemon.weight }} kg</p>
          </div>
          <div>
            <h4>Habilidades</h4>
            <p>{{ pokemon.abilities.join(', ') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TypeBadge from './TypeBadge.vue'

const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
    validator: (value) => {
        return value && value.id && value.name && value.sprite && value.types
    }
  }
})

const getStatColor = (statName) => {
  const colors = {
    hp: '#FF5959',
    attack: '#F5AC78',
    defense: '#FAE078',
    'special-attack': '#9DB7F5',
    'special-defense': '#A7DB8D',
    speed: '#FA92B2'
  }
  return colors[statName] || '#A8A878'
}
</script>

<style scoped>
.pokemon-details {
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.pokemon-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.pokemon-name {
  text-transform: capitalize;
  color: #333;
  margin: 0;
}

.pokemon-id {
  color: #666;
  font-size: 1.2rem;
}

.pokemon-main {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

@media (min-width: 768px) {
  .pokemon-main {
    flex-direction: row;
  }
}

.pokemon-image-container {
  flex: 1;
  text-align: center;
}

.pokemon-image {
  max-width: 100%;
  height: auto;
  max-height: 300px;
}

.pokemon-types {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
}

.pokemon-stats {
  flex: 1;
}

.stat {
  margin-bottom: 10px;
}

.stat-name {
  display: inline-block;
  width: 120px;
  text-transform: capitalize;
  color: #555;
}

.stat-bar-container {
  display: inline-flex;
  align-items: center;
  width: calc(100% - 130px);
}

.stat-bar {
  height: 10px;
  border-radius: 5px;
  margin-right: 10px;
}

.stat-value {
  font-weight: bold;
  color: #333;
}

.pokemon-meta {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.pokemon-meta h4 {
  margin-bottom: 5px;
  color: #555;
}

.pokemon-meta p {
  margin: 0;
  color: #333;
  text-transform: capitalize;
}
</style>