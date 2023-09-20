import request from 'supertest';
import {
  Prisma,
  PrismaClient,
  AccountRole,
  AccountStatus,
  Permissions,
  TextType,
  UserType,
} from '@prisma/client';

import PasswordHelper from '../../src/shared/helpers/password.helper';

const prisma = new PrismaClient();

class SetupDatabase {
  private userAdmin: Prisma.AdminCreateInput;
  private userApp: Prisma.UserCreateInput;

  public adminToken: string;
  public userToken: string;

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
    this.adminToken = '';
    this.userToken = '';
  }

  public async dropDatabase() {
    await prisma.faq.deleteMany({ where: {} });
    await prisma.permission.deleteMany({ where: {} });
    await prisma.security.deleteMany({ where: {} });
    await prisma.text.deleteMany({ where: {} });
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

  public async seedTexts() {
    for (const text of Object.values(TextType)) {
      await prisma.text.create({
        data: {
          type: text,
          content: `${text} vindo da API. Rota integrada.`,
        },
      });
    }
  }

  public async loginAdmin(app: any) {
    const admin = await request(app)
    .post('/auth/login')
    .send({
      'username': 'admin@getnada.com',
      'password': '123456789',
    });
    this.adminToken = admin.body.token;
  }

  public async loginUser(app: any) {
    const user = await request(app)
    .post('/auth/login')
    .send({
      'username': 'userapp@getnada.com',
      'password': '123456789',
    });
    this.userToken = user.body.token;
  }
}

export default new SetupDatabase();
