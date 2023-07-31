// import './App.css';
import Header from './pages/Header';
import { Router } from './routes/Router';
import Footer from './pages/footer/Footer';

function App() {
  return (
    // <div className="App">
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100vh', padding: '5px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <Header />
      <Router />
      </div>
      <Footer />
    </div>
  );
}

export default App;
