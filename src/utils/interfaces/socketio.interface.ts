import { IPayloadDto } from 'modules/auth/dtos/payload.dto';
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

export interface ISocketDto extends IPayloadDto {
  online: boolean;
}
