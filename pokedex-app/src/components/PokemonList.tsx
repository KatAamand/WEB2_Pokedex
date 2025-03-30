import { useEffect, useState } from "react";
import { fetchPokemonList } from "../services/PokeAPI";
import PokemonCard from "./PokemonCard/PokemonCard";

interface PokemonListEntry {
    name: string;
    imageUrl: string;
    types: {
      slot: number;
      type: {
        name: string;
        url: string;
      };
    }[];
}
  
export default function PokemonList() {
    const [pokemonList, setPokemonList] = useState<PokemonListEntry[]>([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getPokemons() {
            try {
                const pokemonList = await fetchPokemonList(); 

                const detailedList = await Promise.all(
                    pokemonList.map(async (pokemon: {name: string, url: string}) => {
                        const result = await fetch(pokemon.url); 
                        const data = await result.json(); 

                        return {
                            name : data.name,
                            imageUrl: data.sprites.front_default,
                            types: data.types.map((t: { type: { name: string } }) => t.type.name),
                        };
                    })
                );

                setPokemonList(detailedList); 
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false); 
            }
        }

        getPokemons(); 
    }, []); 

    if (loading) return <p>Indlæser pokemons</p>

    return (
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
        {pokemonList.map((p) => (
          <PokemonCard key={p.name} name={p.name} imageUrl={p.imageUrl} types={p.types} />
        ))}
      </div>
      );
}