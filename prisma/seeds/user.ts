import { PrismaClient, AccountRole } from '@prisma/client';
import PasswordHelper from '../../src/shared/helpers/password.helper';

export async function seedUser(prisma: PrismaClient): Promise<void> {
  for (let i = 1; i <= 5; i++) {
    await prisma.user.create({
      data: {
        role: AccountRole.user,
        name: 'User 0' + i,
        email: `user${i}@getnada.com`,
        password: PasswordHelper.hash('123456789'),
      },
    });
  }

  console.log('Web user seed OK.');
}
