import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2'; 

export async function fetchPokemonList(limit = 16, offset = 0) {
    try {
        const response = await axios.get(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
        return response.data.results;
    } catch (error) {
        console.error('Error upon fetching pokemon-list', error); 
        throw error; 
    }
}