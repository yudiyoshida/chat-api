import { AccountRole } from '@prisma/client';

export interface ServerToClientEvents {
  'user:list': (users: ISocketDto[])=> void;
}

export interface ClientToServerEvents {
  'user:list': ()=> void;
  'user:online': ()=> void;
  'user:offline': ()=> void;
  'message:list': (chatId: number, cb: (data: any)=> void)=> void;
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
