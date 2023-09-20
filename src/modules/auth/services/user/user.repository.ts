import DataSource from '@database/data-source';

class Repository {
  constructor(private readonly repository = DataSource.user) {}

  public findByCredential(credential: string) {
    return this.repository.findFirst({
      where: {
        OR: [
          { email: credential },
        ],
      },
    });
  }
}

export default new Repository();
