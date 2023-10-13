import { Prisma } from '@prisma/client';
import { UserDto } from 'modules/user/dtos/user.dto';

export type MessageDto = Prisma.MessageGetPayload<{ select: typeof MessageDto }>;
export const MessageDto = Prisma.validator<Prisma.MessageSelect>()({
  id: true,
  chatId: true,
  content: true,
  sentAt: true,
  sentBy: {
    select: UserDto,
  },
});
