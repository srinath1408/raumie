// socket.js
import { BASE_URL } from '../config';
import { io } from 'socket.io-client';

const socket = io(BASE_URL);
export default socket;
