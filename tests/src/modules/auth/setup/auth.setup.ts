import request from 'supertest';
import {
  Prisma,
  PrismaClient,
  AccountRole,
  AccountStatus,
  Permissions,
  UserType,
} from '@prisma/client';

import PasswordHelper from '../../../../../src/shared/helpers/password.helper';

const prisma = new PrismaClient();

class SetupDatabase {
  private userAdmin: Prisma.AdminCreateInput;
  private userApp: Prisma.UserCreateInput;

  constructor() {
    this.userAdmin = {
      role: AccountRole.admin,
      name: 'Admin Master',
      email: 'admin@getnada.com',
      password: PasswordHelper.hash('123456789'),
      status: AccountStatus.ativo,
    };
    this.userApp = {
      role: AccountRole.user,
      type: UserType.app,
      name: 'User app',
      email: 'userapp@getnada.com',
      password: PasswordHelper.hash('123456789'),
      status: AccountStatus.ativo,
    };
  }

  public async dropAdminDatabase() {
    await prisma.admin.deleteMany({ where: {} });
    await prisma.permission.deleteMany({ where: {} });
  }

  public async dropUserDatabase() {
    await prisma.user.deleteMany({ where: {} });
  }

  public async seedAdminFullAccess() {
    const admin = await prisma.admin.create({
      data: this.userAdmin,
    });

    for (const permission of Object.values(Permissions)) {
      await prisma.permission.create({
        data: {
          title: permission,
          admins: {
            connect: { id: admin.id },
          },
        },
      });
    }
  }

  public async seedUserApp() {
    await prisma.user.create({
      data: this.userApp,
    });
  }

  public async loginAdmin(app: any) {
    const account = await request(app)
    .post('/auth/login/adm')
    .send({
      'credential': 'admin@getnada.com',
      'password': '123456789',
    });

    return account.body.token;
  }

  public async loginUser(app: any) {
    const account = await request(app)
    .post('/auth/login')
    .send({
      'credential': 'userapp@getnada.com',
      'password': '123456789',
    });

    return account.body.token;
  }
}

export default new SetupDatabase();
