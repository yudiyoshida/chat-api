import { Prisma } from '@prisma/client';

export const UserDto = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  name: true,
  email: true,
  online: true,
  imageUrl: true,
});
