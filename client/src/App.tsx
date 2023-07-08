import type { Component } from 'solid-js';

import styles from './styles/index.module.css';
import Home from './components/Home';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <Home />
    </div>
  );
};

export default App;
