
import axios from 'axios';
import { baseUrl } from '../url';



// Função para buscar gêneros
export async function FetchGeneros() {
  try {
    const response = await axios.get(`${baseUrl}v1/sbook/generos`);
    const generos = response.data.dados.map(dados => ({
      id: dados.id,
      nome: dados.nome
    }));
    return generos;
  } catch (error) {
    console.error('Erro ao obter dados dos gêneros:', error);
    throw error;
  }
}

// Função para buscar estado do livro
export async function FetchEstadoLivro() {
  try {
    const response = await axios.get(`${baseUrl}v1/sbook/estado-livro`);
    const estados = response.data.estados.map(estado => ({
      id: estado.id,
      estado: estado.estado
    })); 
    return estados;
  } catch (error) {
    console.error('Erro ao obter dados do estado do livro:', error);
    throw error;
  }
}

// Função para buscar tipo_anuncio
export async function FetchTipoAnuncio() {
  try {
    const response = await axios.get(`${baseUrl}v1/sbook/tipo-anuncio`);
    const tipo_anuncio = response.data.tipos.map(tipos => ({
      id: tipos.id,
      tipo: tipos.tipo
    })); 
    return tipo_anuncio;
  } catch (error) {
    console.error('Erro ao obter dados do tipo de anuncio:', error);
    throw error;
  }
}
