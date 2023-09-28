import { Prisma } from '@prisma/client';
import { MessageDto } from 'modules/message/dtos/message.dto';
import { UserDto } from 'modules/user/dtos/user.dto';

export type ChatDto = Prisma.ChatGetPayload<{ select: typeof ChatDto }>;
export const ChatDto = Prisma.validator<Prisma.ChatSelect>()({
  id: true,
  users: {
    select: UserDto,
  },
  messages: {
    select: MessageDto,
    orderBy: { sentAt: 'asc' },
  },
});
