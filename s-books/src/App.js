
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Home from './pages/Home';
import Anuncios from './pages/Anuncios';
import Anunciar from './pages/Anunciar';
//import Login from './pages/Login';
import Favoritos from './pages/Favoritos';
import Chat from './pages/Chat';
import Livro from './pages/Livro';
import Perfil from './pages/Perfil';
import Configuracoes from './components/Configuracoes';
import Anunciar2 from './pages/Anunciar2';
import Anunciar4 from './pages/Anunciar4';


function App() {
  return (
    
    <div className="App">
      
      <Router>
        <div className='container'>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/anuncios" element={<Anuncios />} />
            <Route path="/anunciar" element={<Anunciar />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/livro" element={<Livro />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
            <Route path="/anunciar2" element={<Anunciar2 />} />
            <Route path="/anunciar4" element={<Anunciar4 />} />
          </Routes>
        </div>

      </Router>
      
    </div>
  );
}

export default App;
