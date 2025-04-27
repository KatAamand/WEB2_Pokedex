import styles from './TypeFilter.module.css'; 

interface TypeFilterProperties {
    types: string[]; 
    selectedType: string | null; 
    onSelect: (type: string | null) => void; 
}

export default function TypeFilter({types, selectedType, onSelect}: TypeFilterProperties) {
    return (
        <div className={styles.filterContainer}>
            <button className={`${styles.badge} ${selectedType === null ? styles.active : ''}`} onClick={() => onSelect(null)}>
                All
            </button>

            {types.map((type) => (
                <button key={type} className={`${styles.badge} ${selectedType === type ? styles.active : ''} ${styles[type] || ''}`} onClick={() => onSelect(type)}>
                    {type}
                </button>
            ))}
        </div>
    ); 
}