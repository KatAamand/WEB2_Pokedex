import {useEffect, useState} from "react";
import {fetchPokemonList} from "../services/PokeAPI";
import PokemonCard from "./PokemonCard/PokemonCard";
import TypeFilter from "./TypeFilter/TypeFilter";
import PokemonModal from "./PokemonModal/PokemonModal.tsx";
import type {PokemonDetail, PokemonTypes} from "../types/PokemonTypes.ts";


export default function PokemonList() {
    const [allTypes, setAllTypes] = useState<string[]>([]);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [pokemonList, setPokemonList] = useState<PokemonTypes[]>([]);
    const [isLastPage, setIsLastPage] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedPokemon, setSelectedPokemon] = useState<PokemonTypes & PokemonDetail | null>(null);

    const limit = 16;
    const offset = currentPage * limit;

    const [isLoadingDetails, setIsLoadingDetails] = useState(false);

    const handlePokemonClick = async (pokemon: PokemonTypes) => {
        try {
            setIsLoadingDetails(true);
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
            const data = await res.json();

            setSelectedPokemon({
                ...pokemon,
                height: data.height,
                weight: data.weight,
                abilities: data.abilities.map((ab: { ability: { name: string } }) => ab.ability.name),
                stats: data.stats.map((stat: { stat: { name: string }, base_stat: number }) => ({
                    name: stat.stat.name,
                    value: stat.base_stat,
                })),
            });
        } catch (error) {
            console.error('Kunne ikke hente detaljer', error);
        } finally {
            setIsLoadingDetails(false);
        }
    };




    useEffect(() => {
        async function fetchTypes() {
            const results = await fetch('https://pokeapi.co/api/v2/type');
            const data = await results.json();
            const filtered = data.results.map((t: {
                name: string
            }) => t.name).filter((t: string) => !['unknown', 'shadow'].includes(t));
            setAllTypes(filtered);
        }

        fetchTypes();
    }, []);


    useEffect(() => {
        async function getPokemons() {
            try {
                if (selectedType) {
                    const res = await fetch(`https://pokeapi.co/api/v2/type/${selectedType}`);
                    const data = await res.json();
                    const fullList = data.pokemon.map((p: any) => p.pokemon);

                    const paginated = fullList.slice(offset, offset + limit);
                    setIsLastPage(offset + limit >= fullList.length);

                    const detailedList = await Promise.all(
                        paginated.map(async (pokemon: { name: string; url: string }) => {
                            const result = await fetch(pokemon.url);
                            const data = await result.json();

                            return {
                                name: data.name,
                                imageUrl: data.sprites.front_default,
                                types: data.types.map((t: { type: { name: string } }) => t.type.name),
                            };
                        })
                    );

                    setPokemonList(detailedList);
                } else {
                    const pokemonList = await fetchPokemonList(limit, offset);

                    const detailedList = await Promise.all(
                        pokemonList.map(async (pokemon: { name: string, url: string }) => {
                            const result = await fetch(pokemon.url);
                            const data = await result.json();

                            return {
                                name: data.name,
                                imageUrl: data.sprites.front_default,
                                types: data.types.map((t: { type: { name: string } }) => t.type.name),
                            };
                        })
                    );

                    setPokemonList(detailedList);
                }
            } catch (error) {
                console.error('Uncounted error loading pokemons', error)
            } finally {
                setLoading(false);
            }
        }

        getPokemons();
    }, [offset, selectedType]);

    useEffect(() => {
        setCurrentPage(0);
    }, [selectedType]);

    if (loading) return <p>Loading pokemons</p>

    return (
        <>
            <TypeFilter types={allTypes} selectedType={selectedType} onSelect={setSelectedType}/>

            <div style={{display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))'}}>
                {pokemonList.map((p) => (
                    <div key={p.name} onClick={() => handlePokemonClick(p)}>
                        <PokemonCard key={p.name} name={p.name} imageUrl={p.imageUrl} types={p.types}/>
                    </div>
                ))}
            </div>

            <div style={{textAlign: 'center'}}>
                <button onClick={() => setCurrentPage((p) => Math.max(0, p - 1))} disabled={currentPage === 0}>Previous
                </button>
                <span style={{margin: '0 1rem'}}>{currentPage + 1}</span>
                <button onClick={() => setCurrentPage((p) => p + 1)} disabled={isLastPage === true}>Next</button>
            </div>

            {selectedPokemon && (
                <PokemonModal
                    pokemon={selectedPokemon}
                    onClose={() => setSelectedPokemon(null)}
                    isLoading={isLoadingDetails}
                />
            )}

        </>
    );
}