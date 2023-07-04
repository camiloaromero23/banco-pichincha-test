import { BrowserRouter as Router } from 'react-router-dom';
import logoPichincha from '/pichincha-logo.png';
import styles from './App.module.css';
import { Button } from './components';


function App() {
  return (
    <>
      <header className={styles.header}>
        <img className={styles.logo} src={logoPichincha} alt="Banco Pichincha" />
      </header>
      <main className={styles.main}>
        <Router></Router>
      </main>
      <Button onClick={() => console.log('clicked')} disabled>
        Agregar
      </Button>
      <Button type="secondary" onClick={() => console.log('clicked reiniciar')}>
        Reiniciar
      </Button>
    </>
  );
}

export default App;
