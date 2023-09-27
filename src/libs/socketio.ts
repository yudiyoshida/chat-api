import socketOptions from '@config/socketio';
import { Server, Socket } from 'socket.io';
import { ClientToServerEvents, ServerToClientEvents, ISocketDto, InterServerEvents } from '@interfaces/socketio.interface';

class SocketIO {
  private readonly io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, ISocketDto>;
  private _users = new Map<string, ISocketDto>();

  constructor(server: any) {
    this.io = new Server(server, socketOptions);
    this.registerEvents();
  }

  private get users() {
    return [...this._users.values()];
  }

  private registerEvents() {
    this.io.on('connection', (socket) => {

      // save new user in map and emit to everyone.
      const user = socket.handshake.auth as ISocketDto;
      this._users.set(socket.id, { ...user, online: true });
      this.io.emit('user:list', this.users);

      // send user map.
      socket.on('user:list', () => {
        socket.emit('user:list', this.users);
      });

      // onOnline, update status and emit to everyone.
      socket.on('user:online', () => {
        this.changeStatus(true, socket);
        this.io.emit('user:list', this.users);
      });

      // onOffline, update status and emit to everyone.
      socket.on('user:offline', () => {
        this.changeStatus(false, socket);
        this.io.emit('user:list', this.users);
      });

      // onDisconnect, remove user from map and emit to everyone.
      socket.on('disconnect', () => {
        this._users.delete(socket.id);
        this.io.emit('user:list', this.users);
      });

    });
  }

  private changeStatus(online: boolean, socket: Socket) {
    const user = this._users.get(socket.id);
    if (user) {
      user.online = online;
      this._users.set(socket.id, user);
    }
  }
}

export default SocketIO;
