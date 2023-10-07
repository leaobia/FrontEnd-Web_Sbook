import React, { useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../url';



// Função para buscar gêneros
export async function FetchGeneros() {
  try {
    const response = await axios.get(`${baseUrl}v1/sbook/generos`);
    const generos = response.data.dados.map(dados => dados.nome)
    console.log(generos);
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
    const estados = response.data.estados.map(estado => estado.estado); 
    console.log(estados);
    return estados;
  } catch (error) {
    console.error('Erro ao obter dados do estado do livro:', error);
    throw error;
  }
}
