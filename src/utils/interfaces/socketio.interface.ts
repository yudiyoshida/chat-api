import { AccountRole } from '@prisma/client';
import { CreateMessageDto } from 'modules/message/dtos/create-message.dto';
import { MessageDto } from 'modules/message/dtos/message.dto';

export interface ServerToClientEvents {
  'user:list': (users: ISocketDto[])=> void;
  'chat:detail': (chat: any)=> void;
  'message:list': (messages: MessageDto[])=> void;
  'message:create': (messages: MessageDto[])=> void;
}

export interface ClientToServerEvents {
  'user:list': ()=> void;
  'user:online': ()=> void;
  'user:offline': ()=> void;
  'chat:detail': (userId: number, chatId: number)=> void;
  'message:list': (userOne: number, userTwo: number)=> void;
  'message:create': (data: CreateMessageDto, userId: number)=> void;
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
