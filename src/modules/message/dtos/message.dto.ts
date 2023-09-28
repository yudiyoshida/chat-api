import { Prisma } from '@prisma/client';
import { UserDto } from 'modules/user/dtos/user.dto';

export const MessageDto = Prisma.validator<Prisma.MessageSelect>()({
  id: true,
  content: true,
  sentAt: true,
  sentBy: {
    select: UserDto,
  },
});
