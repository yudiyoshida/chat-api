import { AccountRole } from '@prisma/client';

export interface ServerToClientEvents {}

export interface ClientToServerEvents {}

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
