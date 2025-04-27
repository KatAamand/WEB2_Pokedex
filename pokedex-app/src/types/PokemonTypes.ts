export interface PokemonTypes {
    name: string;
    imageUrl: string;
    types: string[];
}

export interface PokemonDetail {
    height: number;
    weight: number;
    abilities: string[];
    stats: { name: string; value: number }[];
}

export type FullPokemon = PokemonTypes & PokemonDetail;
