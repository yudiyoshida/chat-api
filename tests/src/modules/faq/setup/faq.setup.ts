import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class FaqSetup {
  public async dropFaqDatabase() {
    await prisma.faq.deleteMany({ where: {} });
  }

  public async createFaqs(data: Prisma.FaqCreateInput[]) {
    await prisma.faq.createMany({
      data,
    });
  }
}

export default new FaqSetup();
