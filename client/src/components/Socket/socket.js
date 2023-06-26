import io from 'socket.io-client';
// const sockets = io('http://localhost:8000', { autoConnect: true, forceNew: true });
const sockets = io('/');
// const sockets = io('http://testwebapp.ealphabits.com:8000', { autoConnect: true, forceNew: true });
export default sockets;
