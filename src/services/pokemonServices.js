import api from "../utils/api";

import axios from "axios";

const veekunApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2/evolution-chain/",
});

export const getPokemonEvolutions = async (id) => {
  try {
    const response = await veekunApi.get(`${id}/`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar evoluções do Pokémon:", error);
    throw error;
  }
};

export const getPokemons = async () => {
    try {
        const response = await api.get('pokemon?limit=100');
        return response.data.results;
    } catch (error) {
        console.error("Erro ao buscar pokémons:", error);
        throw error;
    }
};

export const getPokemonDetails = async (pokemonName) => {
    try {
        const response = await api.get(`pokemon/${pokemonName}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar detalhes do Pokémon:", error);
        throw error;
    }
};

export const getPokemonSpecies = async (pokemonName) => {
    try {
        const response = await api.get(`pokemon-species/${pokemonName}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar espécie do Pokémon:", error);
        throw error;
    }
};

