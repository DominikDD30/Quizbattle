import { io, Socket } from 'socket.io-client';

const SERVER_URL = 'https://quizserver-nitx.onrender.com';

const socket: Socket = io(SERVER_URL);

export default socket;
