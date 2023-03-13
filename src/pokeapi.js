import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokemonList = async (limit = 20, offset = 0) => {
  const response = await axios.get(`${BASE_URL}/pokemon`, {
    params: {
      limit,
      offset,
    },
  });

  return response.data;
};

export const getPokemonDataByName = async (pokemonName) => {
  const response = await axios.get(`${BASE_URL}/pokemon/${pokemonName}`);
  return response.data;
};

export const getPokemonSpecies  = async (pokemonName) => {
    const response = await axios.get(`${BASE_URL}/pokemon-species/${pokemonName}`);
    return response.data;
}

export const getEvolutionChainData = async (id) => {
  const response = await axios.get(`${BASE_URL}/evolution-chain/${id}`);
  return response.data;
}