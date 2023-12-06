import {io} from 'socket.io-client'

// export const socket = () => io('http://10.107.144.5:3001/')
// export const socket = () => io('https://sbookapp.azurewebsites.net/')
 //export const socket = () => io("http://10.107.144.20:3001")

export const socket = () => io("https://socket-grupo6.webpubsub.azure.com/", {
    path: "/clients/socketio/hubs/Hub",
});