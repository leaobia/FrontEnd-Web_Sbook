
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Home from './pages/Home';
import Anuncios from './pages/Anuncios';
import Doacoes from './pages/Doacoes';

function App() {
  return (
    <div className="App">
      <Router>
        <div className='container'>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/anuncios" element={<Anuncios />} />
            <Route path="/doacoes" element={<Doacoes />} />
          </Routes>
        </div>

      </Router>

    </div>
  );
}

export default App;
