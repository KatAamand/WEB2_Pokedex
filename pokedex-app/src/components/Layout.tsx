import { Outlet, Link } from 'react-router-dom';
import styles from './Layout.module.css';

export default function Layout() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.logo}>Pokédex</div>
        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>Pokémons</Link>
          <Link to="/about" className={styles.link}>Om</Link>
        </nav>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
