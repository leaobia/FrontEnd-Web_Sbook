//export const baseUrl = 'https://app-nodejs.cyclic.cloud/'
export const baseUrl = 'https://sbookapp.azurewebsites.net/'

// export const baseUrl = 'http://10.107.144.5:8080/'

export function logOut () {
    localStorage.clear();
    window.location.href = '/'
}

let dataAtual = new Date();

export let anoAtual = dataAtual.getFullYear();