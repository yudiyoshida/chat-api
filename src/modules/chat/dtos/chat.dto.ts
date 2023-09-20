import { Prisma } from '@prisma/client';

export const ChatDto = Prisma.validator<Prisma.ChatSelect>()({
  id: true,
  users: {
    select: {
      id: true,
      name: true,
      email: true,
      imageUrl: true,
      online: true,
    },
  },
  messages: {
    orderBy: { sentAt: 'asc' },
  },
});
