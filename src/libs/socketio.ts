import socketOptions from '@config/socketio';
import { Server, Socket } from 'socket.io';
import { ClientToServerEvents, ServerToClientEvents, ISocketDto, InterServerEvents } from '@interfaces/socketio.interface';

import ChatService from 'modules/chat/chat.service';
import MessageService from 'modules/message/message.service';

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

  private getCredentials(socket: Socket) {
    return socket.handshake.auth as ISocketDto;
  }

  private registerEvents() {
    this.io.on('connection', (socket) => {

      // save new user in map and emit to everyone.
      const user = this.getCredentials(socket);
      this._users.set(socket.id, { ...user, online: true });
      console.log('chamou user:list');
      this.io.emit('user:list', this.users);

      // send user map.
      socket.on('user:list', () => {
        console.log('chamou user:list');
        socket.emit('user:list', this.users);
      });

      // onOnline, update status and emit to everyone.
      socket.on('user:online', () => {
        console.log('chamou user:online');
        this.changeStatus(true, socket);
        console.log('chamou user:list');
        this.io.emit('user:list', this.users);
      });

      // onOffline, update status and emit to everyone.
      socket.on('user:offline', () => {
        console.log('chamou user:offline');
        this.changeStatus(false, socket);
        console.log('chamou user:list');
        this.io.emit('user:list', this.users);
      });

      // onChatDetail, return chat infos.
      socket.on('chat:detail', async(userId: number, chatId: number) => {
        console.log('chamou chat:detail');
        try {
          console.log(userId, chatId);
          const chat = await ChatService.findOneByUsersIds(+userId, +chatId);
          socket.emit('chat:detail', chat);


        } catch (err) {
          console.log(err);

        }
      });

      // onMessageList, emit chat's messages to socket.
      socket.on('message:list', async(userOne, userTwo) => {
        console.log('chamou message:list');
        try {
          const messages = await MessageService.getAll(+userOne, +userTwo);
          socket.emit('message:list', messages);

        } catch (err) {
          console.log('erro no messagelist');
          console.log(err);
        }
      });

      // onMessageCreate, save new message and return to socket.
      socket.on('message:create', async(data, id) => {
        console.log('chamou message:create');
        try {
          const messages = await MessageService.createOne(data, id);
          console.log('chamou message:list');
          this.io.emit('message:list', messages);

        } catch (err) {
          console.log(err);
        }
      });

      // onDisconnect, remove user from map and emit to everyone.
      socket.on('disconnect', () => {
        console.log('chamou disconnect');
        this._users.delete(socket.id);
        console.log('chamou user:list');
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
