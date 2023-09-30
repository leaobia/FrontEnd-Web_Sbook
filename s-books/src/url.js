//export const baseUrl = 'https://app-nodejs.cyclic.cloud/'
export const baseUrl = 'http://localhost:8080/'


export function logOut () {
    localStorage.clear();
    window.location.href = '/'
}