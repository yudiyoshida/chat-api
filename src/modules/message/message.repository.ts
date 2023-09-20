import DataSource from '@database/data-source';

import { Prisma } from '@prisma/client';

class Repository {
  constructor(private readonly repository = DataSource.message) {}

  public createOne(data: Prisma.MessageCreateInput) {
    return this.repository.create({
      data,
    });
  }
}

export default new Repository();
