<template>
    <div class="pokemon-view">
        <button @click="goBack" class="back-button">← Voltar</button>

        <div v-if="isLoading" class="loading">Carregando...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <template v-else>
            <PokemonDetails v-if="pokemon" :pokemon="pokemon" />
            <div v-else class="not-found">Pokémon não encontrado</div>
        </template>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import usePokeApi from '../composables/usePokeApi'
import PokemonDetails from '../components/PokemonDetails.vue'

const router = useRouter()
const route = useRoute()
const { pokemon, isLoading, error, fetchPokemonDetails } = usePokeApi()

const loadPokemon = async (id) => {
    try {
        await fetchPokemonDetails(id)
        console.log('Pokémon carregado:', pokemon.value)
    } catch (err) {
        console.error('Erro ao carregar Pokémon:', err)
    }
}

onMounted(() => {
    console.log('ID do Pokémon:', route.params.id)
    loadPokemon(route.params.id)
})

watch(() => route.params.id, (newId) => {
    if (newId) {
        console.log('ID mudou para:', newId)
        loadPokemon(newId)
    }
})

const goBack = () => {
    router.push({ name: 'home' })
}
</script>

<style scoped>
.pokemon-view {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
}

.back-button {
    background: #2a75bb;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 20px;
}

.back-button:hover {
    background: #3c5aa6;
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

.not-found {
    text-align: center;
    padding: 20px;
    font-size: 1.2rem;
    color: #666;
}
</style>