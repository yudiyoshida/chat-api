import { IPayloadDto } from 'modules/auth/dtos/payload.dto';
import { CreateChatDto } from 'modules/chat/dtos/create-chat.dto';
import { CreateMessageDto } from 'modules/message/dtos/create-message.dto';
import { MessageDto } from 'modules/message/dtos/message.dto';

export interface ServerToClientEvents {
  'message:list': (messages: MessageDto[])=> void;
  'error': (message: string)=> void;
}

export interface ClientToServerEvents {
  'room:list': ()=> void;
  'chat:create': (data: CreateChatDto)=> void;
  'message:list': (chatId: number)=> void;
  'message:create': (data: CreateMessageDto)=> void;
}

export interface InterServerEvents {
  ping: ()=> void;
}

export interface ISocketDto extends IPayloadDto {
  online: boolean;
}
