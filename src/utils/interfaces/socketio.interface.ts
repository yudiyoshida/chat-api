import { AccountRole } from '@prisma/client';
import { CreateMessageDto } from 'modules/message/dtos/create-message.dto';
import { MessageDto } from 'modules/message/dtos/message.dto';

export interface ServerToClientEvents {
  'message:list': (messages: MessageDto[])=> void;
  'error': (message: string)=> void;
}

export interface ClientToServerEvents {
  'message:list': (chatId: number)=> void;
  'message:create': (data: CreateMessageDto, cb: ()=> void)=> void;
}

export interface InterServerEvents {
  ping: ()=> void;
}

export interface ISocketDto {
  id: number;
  role: AccountRole;
  name: string;
  email: string;
  iat?: number;
  exp?: number;
  online: boolean;
}
