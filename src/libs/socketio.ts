import { Server } from 'socket.io';
import socketOptions from '@config/socketio';

class SocketIO {
  private readonly io: Server;

  constructor(server: any) {
    this.io = new Server(server, socketOptions);
    this.registerEvents();
  }

  private registerEvents() {
    this.io.on('connection', (socket) => {

      console.log('new connection: ', socket.id);

      socket.on('disconnect', this.onDisconnect(socket.id));
    });
  }

  private onDisconnect(socket: string) {
    return () => console.log(socket, ' disconnected');
  }
}

export default SocketIO;
