import { Prisma, PrismaClient, AccountRole } from '@prisma/client';
import PasswordHelper from '../../src/shared/helpers/password.helper';

const user: Prisma.UserCreateInput = {
  role: AccountRole.user,
  name: 'User 01',
  email: 'user@getnada.com',
  password: PasswordHelper.hash('123456789'),
  online: true,
};

export async function seedUser(prisma: PrismaClient): Promise<void> {
  await prisma.user.create({
    data: user,
  });

  console.log('Web user seed OK.');
}
