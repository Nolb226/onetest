import io from 'socket.io-client';
import api from '../config/config';

const socket = io(`${api}`, {
	auth: {
		token: localStorage.getItem('currentUser'),
	},
});

export default socket;