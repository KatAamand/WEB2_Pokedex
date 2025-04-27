import styles from './PokemonModal.module.css';
import type {FullPokemon} from '../../types/PokemonTypes';

interface PokemonModalProps {
    pokemon: FullPokemon;
    onClose: () => void;
    isLoading: boolean;
}

export default function PokemonModal({pokemon, onClose, isLoading}: PokemonModalProps) {
    return (
        <div className={styles.backdrop} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>X</button>

                {isLoading ? (
                    <p>Loading details...</p>
                ) : (
                    <div className={styles.modalContent}>

                        <div className={styles.imageSection}>
                            <img src={pokemon.imageUrl} alt={pokemon.name} className={styles.image}/>

                            <div className={styles.typeList}>
                                {pokemon.types.map((type) => (
                                    <span key={type} className={`${styles.typeBadge} ${styles[type] || ''}`}>
                                      {type}
                                    </span>
                                ))}
                            </div>


                        </div>


                        <div className={styles.detailsSection}>
                            <h2 className={styles.name}>{pokemon.name}</h2>

                            <div className={styles.statsBox}>
                                <div className={styles.statsColumn}>
                                    <p><strong>Height:</strong> {pokemon.height / 10} m</p>
                                    <p><strong>Weight:</strong> {pokemon.weight / 10} kg</p>
                                </div>
                                <div className={styles.statsColumn}>
                                    {pokemon.abilities && (
                                        <>
                                            <p><strong>Abilities:</strong></p>
                                            <p>{pokemon.abilities.join(', ')}</p>
                                        </>
                                    )}
                                </div>
                            </div>


                            {pokemon.stats && (
                                <div className={styles.statsSection}>
                                    <h3>Base Stats</h3>
                                    <ul>
                                        {pokemon.stats.map((stat) => (
                                            <li key={stat.name}>
                                                {stat.name}: {stat.value}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
