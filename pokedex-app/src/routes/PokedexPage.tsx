import PokemonList from "../components/PokemonList";
import styles from './PokedexPage.module.css'

export default function PokedexPage() {
    return (
        <div className={styles.wrapper}>
            <PokemonList />
        </div>
    )
}