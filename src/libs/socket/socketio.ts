import socketOptions from '@config/socketio';
import { Server, Socket } from 'socket.io';
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  ISocketDto,
} from '@interfaces/socketio.interface';
import chatService from 'modules/chat/chat.service';

// import ChatService from 'modules/chat/chat.service';
// import MessageService from 'modules/message/message.service';

type ServerTS = Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, ISocketDto>;
type SocketTS = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, ISocketDto>;

class SocketIO {
  private readonly io: ServerTS;
  private _users = new Map<string, ISocketDto>();

  constructor(server: any) {
    this.io = new Server(server, socketOptions);
    this.registerEvents();
  }

  private registerEvents() {
    this.io.on('connection', (socket) => {

      // save new user in map and emit to everyone.
      const user = this.getCredentials(socket);
      this._users.set(socket.id, { ...user, online: true });
      this.io.emit('user:list', this.users);

      socket.on('user:list', this.emitUserList(socket)); // send all users to socket.
      socket.on('user:online', this.emitChangeStatus(socket, true)); // update status and emit to everyone.
      socket.on('user:offline', this.emitChangeStatus(socket, false)); // update status and emit to everyone.

      socket.on('chat:detail', async(targetId, cb) => {
        console.log('chamou chat:detail');
        try {
          const chat = await chatService.findOneByUsersIds(+targetId, +this.getCredentials(socket).id);
          cb(chat);

        } catch (err) {
          console.log(err);
          cb(err);

        }
      });

      // onDisconnect, remove user from map and emit to everyone.
      socket.on('disconnect', () => {
        console.log('chamou disconnect');
        this._users.delete(socket.id);
        this.io.emit('user:list', this.users);
      });

    });
  }

  private get users() {
    return [...this._users.values()];
  }

  private getCredentials(socket: SocketTS) {
    return socket.handshake.auth as ISocketDto;
  }

  private emitUserList(socket: SocketTS) {
    console.log('chamou user:list');
    return () => {
      socket.emit('user:list', this.users);
    };
  }

  private emitChangeStatus(socket: Socket, online: boolean) {
    console.log('chamou changeStatus');
    return () => {
      const user = this._users.get(socket.id);
      if (user) {
        user.online = online;
        this._users.set(socket.id, user);
      }
      this.io.emit('user:list', this.users);
    };
  }
}

export default SocketIO;
