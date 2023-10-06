import socketOptions from '@config/socketio';
import { Server, Socket } from 'socket.io';
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  ISocketDto,
} from '@interfaces/socketio.interface';
import messageService from 'modules/message/message.service';
import { z } from 'zod';
import { ChatIdDto } from './dtos/chat.dto';
import { CreateMessage } from 'modules/message/dtos/create-message.dto';

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
      console.log(socket.data);
      next();
    });

    this.io.use((socket, next) => {
      socket.onAny((event, args) => {
        console.log(event, args);
        console.log(socket.rooms);
      });
      next();
    });

    this.io.use((socket, next) => {
      socket.onAnyOutgoing((event) => {
        console.log(event);
      });
      next();
    });
  }

  private schemaValidator<T extends z.ZodTypeAny>(schema: T, value: any) {
    return schema.parse(value);
  }

  private registerEvents() {
    this.io.on('connection', (socket: SocketTS) => {
      console.log('new connection: ', socket.id);

      socket.on('message:list', async(chatId) => {
        try {
          chatId = this.schemaValidator(ChatIdDto, chatId);

          const messages = await messageService.getAll(chatId, +socket.data.id);
          socket.emit('message:list', messages);

        } catch (error: any) {
          socket.emit('error', error.message);

        }
      });

      socket.on('message:create', async(data) => {
        try {
          data = this.schemaValidator(CreateMessage, data);

          socket.join(data.chatId.toString());

          const messages = await messageService.createOne(data, +socket.data.id);
          this.io.to(data.chatId.toString()).emit('message:list', messages);

        } catch (error: any) {
          socket.emit('error', error.message);

        }
      });

      socket.on('disconnect', () => {
        console.log('chamou disconnect');
        console.log('saiu: ', socket.id);
      });

    });
  }
}

export default SocketIO;