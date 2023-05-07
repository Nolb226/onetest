import io from 'socket.io-client';
import api from '../config/config';

const socket = io.connect(`${api}`, {
	auth: {
		token: localStorage.getItem('currentUser'),
	},
	'connect timeout': 5000,
	// transports: ['websocket'],
});

socket.on('connect_error', (error) => {
	console.log(error);
});

export default socket;
