import socketOptions from '@config/socketio';
import { Server, Socket } from 'socket.io';
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  ISocketDto,
} from '@interfaces/socketio.interface';
import { z } from 'zod';
import { CreateMessage } from 'modules/message/dtos/create-message.dto';
import { CreateChat } from 'modules/chat/dtos/create-chat.dto';

import chatService from 'modules/chat/chat.service';
import messageService from 'modules/message/message.service';

type ServerTS = Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, ISocketDto>;
type SocketTS = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, ISocketDto>;

class SocketIO {
  private readonly io: ServerTS;
  private sockets = new Map<string, string>();

  constructor(server: any) {
    this.io = new Server(server, socketOptions);
    this.registerMiddlewares();
    this.registerEvents();
  }

  private registerMiddlewares() {
    this.io.use((socket, next) => {
      socket.data = socket.handshake.auth as ISocketDto;
      console.log(socket.data);
      next();
    });

    this.io.use((socket, next) => {
      socket.onAny((event, args) => {
        console.log('chegando:', event, args);
      });
      next();
    });

    this.io.use((socket, next) => {
      socket.onAnyOutgoing((event) => {
        console.log('saindo:', event);
      });
      next();
    });
  }

  private schemaValidator<T extends z.ZodTypeAny>(schema: T, value: any) {
    return schema.parse(value);
  }

  private newConnection(socket: SocketTS) {
    console.log('new connection: ', socket.id);
    this.sockets.set(socket.data.id.toString(), socket.id);
    console.log(this.sockets);
  }

  private removeConnection(socket: SocketTS) {
    this.sockets.delete(socket.data.id.toString());
    console.log('chamou disconnect');
    console.log('saiu: ', socket.id);
    console.log(this.sockets);
  }

  private async connectAllRooms(socket: SocketTS) {
    const chats = await chatService.findAll(socket.data.id);
    chats.forEach(chat => socket.join(chat.id.toString()));

    socket.emit('chat:list', chats);
  }

  private async connectMeToRoom(socket: SocketTS, chat: any) {
    socket.join(chat.id.toString());
    socket.emit('chat:list', await chatService.findAll(socket.data.id));
  }

  private registerEvents() {
    this.io.on('connection', (socket: SocketTS) => {

      this.newConnection(socket);
      this.connectAllRooms(socket);

      socket.on('chat:create', async(chat) => {
        try {
          chat = this.schemaValidator(CreateChat, chat);

          const newChat = await chatService.create(chat, socket.data.id);

          this.connectMeToRoom(socket, newChat);

          newChat.users.others.map(async(user) => {
            const sckt = this.sockets.get(user.id.toString());
            if (sckt) {
              this.io.to(sckt).socketsJoin(newChat.id.toString());

              const chats = await chatService.findAll(user.id);
              this.io.to(sckt).emit('chat:list', chats);

            } else {
              console.log('não há socket no map');

            }
          });

        } catch (error: any) {
          socket.emit('error', error.message);

        }
      });

      socket.on('chat:list', async() => {
        try {
          const chats = await chatService.findAll(socket.data.id);
          socket.emit('chat:list', chats);

        } catch (error: any) {
          socket.emit('error', error.message);

        }
      });

      socket.on('message:create', async(data) => {
        try {
          data = this.schemaValidator(CreateMessage, data);

          const newMessage = await messageService.createOne(data, socket.data.id);
          this.io.to(data.chatId.toString()).emit('message:create', newMessage);

        } catch (error: any) {
          socket.emit('error', error.message);

        }
      });

      socket.on('disconnect', () => {
        this.removeConnection(socket);
      });

    });
  }
}

export default SocketIO;
