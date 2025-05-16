<template>
    <div class="home">
        <h1>Pokedex</h1>
        <SearchBar @search="handleSearch" />

        <div v-if="isLoading" class="loading">Carregando...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <div v-else class="pokemon-grid">
            <PokemonCard v-for="pokemon in filteredPokemons" :key="pokemon.id" :pokemon="pokemon"
                @click="() => pokemon && goToPokemon(pokemon.id)" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import usePokeApi from '../composables/usePokeApi';
import PokemonCard from '../components/PokemonCard.vue';
import SearchBar from '../components/SearchBar.vue';

const router = useRouter();
const { pokemons, isLoading, error, fetchPokemons } = usePokeApi();
const searchQuery = ref('');

onMounted(() => {
    fetchPokemons();
})

const filteredPokemons = computed(() => {
    return pokemons.value.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        pokemon.id.toString().includes(searchQuery.value)
    )
})

const handleSearch = (query) => {
    searchQuery.value = query;
}

const goToPokemon = (id) => {
    router.push({ name: 'pokemon', params: { id } })
}
</script>

<style scoped>
.home {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

h1 {
    text-align: center;
    color: #ffcb05;
    text-shadow: 2px 2px 4px #2a75bb;
    margin-bottom: 30px;
}

.pokemon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
}

.loading,
.error {
    text-align: center;
    padding: 20px;
    font-size: 1.2rem;
}

.error {
    color: #ff0000;
}
</style>