// import './App.css';
import Header from './pages/Header';

import { Router } from './routes/Router';

function App() {
  return (
    // <div className="App">
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <Header />
      <Router />
    </div>
  );
}

export default App;
