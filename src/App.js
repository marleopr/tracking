// import './App.css';
import Header from './pages/Header';
import HomePage from './pages/HomePage';

function App() {
  return (
    // <div className="App">
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <Header />
      <HomePage />
    </div>
  );
}

export default App;
