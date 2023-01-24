import styles from './bottonMenu.module.css';

export function Menu() {
  return (
    <div className={styles.menuContainer}>
      <button>MENU</button>
      <button>EXIT</button>
    </div>
  );
}
