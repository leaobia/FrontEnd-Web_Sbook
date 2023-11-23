import {io} from 'socket.io-client'

export const socket = () => io("http://localhost:3001")
// export const socket = () => io("http://10.107.144.23:3001")