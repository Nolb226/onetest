import io from 'socket.io-client';
import api from '../config/config';

const socket = io(`${api}`);

export default socket;
