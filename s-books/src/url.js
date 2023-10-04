//export const baseUrl = 'https://app-nodejs.cyclic.cloud/'
//export const baseUrl = 'http://localhost:8080/'

export const baseUrl = 'http://10.107.144.7:8080/'

export function logOut () {
    localStorage.clear();
    window.location.href = '/'
}

let dataAtual = new Date();

export let anoAtual = dataAtual.getFullYear();