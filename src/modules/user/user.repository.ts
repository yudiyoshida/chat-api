import DataSource from '@database/data-source';

import { Prisma } from '@prisma/client';
import { UserDto } from './dtos/user.dto';

class Repository {
  constructor(private readonly repository = DataSource.user) {}

  public findAll(limit: number, page: number, userId: number, search?: string) {
    const where: Prisma.UserWhereInput = {
      AND: [
        { OR:
          [
            { name: { contains: search } },
          ],
        },
      ],
      NOT: [{ id: userId }],
    };

    return DataSource.$transaction([
      this.repository.findMany({
        where,
        take: limit,
        skip: ((page - 1) * limit),
        select: UserDto,
        orderBy: { name: 'asc' },
      }),
      this.repository.count({ where }),
    ]);
  }

  public findAllNoPagination(userId: number, search?: string) {
    const where: Prisma.UserWhereInput = {
      AND: [
        { OR:
          [
            { name: { contains: search } },
          ],
        },
      ],
      NOT: [{ id: userId }],
    };

    return this.repository.findMany({
      where,
      select: UserDto,
      orderBy: { name: 'asc' },
    });
  }

  public findOne(id: number) {
    return this.repository.findUnique({
      where: { id },
      select: UserDto,
    });
  }

  public findByUniqueFields(email: string) {
    return this.repository.findFirst({
      where: {
        OR: [
          { email },
        ],
      },
    });
  }

  public createOne(data: any) {
    return this.repository.create({
      data,
      select: UserDto,
    });
  }

  public updateOne(id: number, data: any) {
    return this.repository.update({
      where: { id },
      data,
      select: UserDto,
    });
  }

  public deleteOne(id: number) {
    return this.repository.delete({
      where: { id },
      select: UserDto,
    });
  }
}

export default new Repository();
