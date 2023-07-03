import { BrowserRouter as Router } from 'react-router-dom';
import logoPichincha from '/pichincha-logo.png';
import styles from './App.module.css'

function App() {
  return (
    <>
      <header className={styles.header}>
        <img className={styles.logo} src={logoPichincha} alt="Banco Pichincha" />
      </header>
      <main className={styles.main}>
        <Router></Router>
      </main>
    </>
  );
}

export default App;
