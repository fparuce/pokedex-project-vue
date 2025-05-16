<template>
  <span class="type-badge" :class="type.toLowerCase()">
    {{ type }}
  </span>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.type-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  color: white;
  text-transform: capitalize;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
}

/* Cores para cada tipo de Pokémon */
.normal { background-color: #A8A878; }
.fire { background-color: #F08030; }
.water { background-color: #6890F0; }
.electric { background-color: #F8D030; }
.grass { background-color: #78C850; }
.ice { background-color: #98D8D8; }
.fighting { background-color: #C03028; }
.poison { background-color: #A040A0; }
.ground { background-color: #E0C068; }
.flying { background-color: #A890F0; }
.psychic { background-color: #F85888; }
.bug { background-color: #A8B820; }
.rock { background-color: #B8A038; }
.ghost { background-color: #705898; }
.dragon { background-color: #7038F8; }
.dark { background-color: #705848; }
.steel { background-color: #B8B8D0; }
.fairy { background-color: #EE99AC; }
</style>