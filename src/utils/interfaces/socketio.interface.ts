import { IPayloadDto } from 'modules/auth/dtos/payload.dto';
import { ChatDto } from 'modules/chat/dtos/chat.dto';
import { CreateChatDto } from 'modules/chat/dtos/create-chat.dto';
import { CreateMessageDto } from 'modules/message/dtos/create-message.dto';
import { MessageDto } from 'modules/message/dtos/message.dto';

export interface ServerToClientEvents {
  'chat:list': (chats: ChatDto[])=> void;
  'message:create': (messages: MessageDto)=> void;
  'message:list': (messages: MessageDto[])=> void;
  'error': (message: string)=> void;
}

export interface ClientToServerEvents {
  'chat:create': (data: CreateChatDto)=> void;
  'chat:list': ()=> void;
  'message:create': (data: CreateMessageDto)=> void;
}

export interface InterServerEvents {
  ping: ()=> void;
}

export interface ISocketDto extends IPayloadDto {
  online: boolean;
}
