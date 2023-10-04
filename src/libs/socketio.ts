import socketOptions from '@config/socketio';
import { Server, Socket } from 'socket.io';
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  ISocketDto,
} from '@interfaces/socketio.interface';

type ServerTS = Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, ISocketDto>;
type SocketTS = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, ISocketDto>;

class SocketIO {
  private readonly io: ServerTS;

  constructor(server: any) {
    this.io = new Server(server, socketOptions);
    this.registerMiddlewares();
    this.registerEvents();
  }

  private registerMiddlewares() {
    this.io.use((socket, next) => {
      socket.data = socket.handshake.auth as ISocketDto;
      next();
    });

    this.io.use((socket, next) => {
      socket.onAny((event, args) => {
        console.log(event, args);
      });
      next();
    });
  }

  private registerEvents() {
    this.io.on('connection', (socket: SocketTS) => {
      console.log('new connection: ', socket.id);
    });
  }
}

export default SocketIO;
