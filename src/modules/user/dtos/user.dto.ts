import { Prisma } from '@prisma/client';

export type UserDto = Prisma.UserGetPayload<{ select: typeof UserDto }>;
export const UserDto = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  name: true,
  email: true,
  imageUrl: true,
});
