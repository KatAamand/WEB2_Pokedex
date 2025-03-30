import styles from './PokemonCard.module.css';

interface PokemonCardProps {
  name: string;
  imageUrl: string;
  types: string[];
}

export default function PokemonCard({ name, imageUrl, types }: PokemonCardProps) {
  const primaryType = types[0] ?? 'default';
  const typeClass = styles[primaryType] || styles.default;

  return (
    <div className={`${styles.card} ${typeClass}`}>
      <img src={imageUrl} alt={name} className={styles.image} />
      <h2 className={styles.name}>{name}</h2>
      <div className={styles.typeList}>
        {types.map((type) => (
          <span key={type} className={styles.typeBadge}>
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}
