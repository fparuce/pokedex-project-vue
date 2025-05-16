import { ref } from "vue";
import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  timeout: 10000,
});

export default function usePokeApi() {
  const pokemons = ref([]);
  const pokemon = ref(null);
  const isLoading = ref(false);
  const error = ref(null);

  const fetchPokemons = async (limit = 151, offset = 0) => {
    try {
      isLoading.value = true;
      const response = await api.get(`pokemon?limit=${limit}&offset=${offset}`);
      pokemons.value = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const details = await fetchPokemonDetails(pokemon.name);
          return details;
        })
      );
    } catch (err) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  };

  const fetchPokemonDetails = async (nameOrId) => {
    try {
      isLoading.value = true;
      error.value = null;
      pokemon.value = null;

      const response = await api.get(`pokemon/${nameOrId}`);
      const formattedData = formatPokemonData(response.data);
      pokemon.value = formattedData;
      return formattedData; // Retorna os dados formatados
    } catch (err) {
      error.value = err.message;
      throw err; // Propaga o erro para ser tratado pelo componente
    } finally {
      isLoading.value = false;
    }
  };

  const formatPokemonData = (data) => {
    return {
      id: data.id,
      name: data.name,
      sprite: data.sprites.other["official-artwork"].front_default,
      types: data.types.map((type) => type.type.name),
      stats: data.stats.map((stat) => ({
        name: stat.stat.name,
        value: stat.base_stat,
      })),
      height: data.height / 10, // em metros
      weight: data.weight / 10, // em kg
      abilities: data.abilities.map((ability) => ability.ability.name),
    };
  };

  return {
    pokemons,
    pokemon,
    isLoading,
    error,
    fetchPokemons,
    fetchPokemonDetails,
  };
}
