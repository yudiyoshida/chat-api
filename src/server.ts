import app from './app';
import DataSource from '@database/data-source';

async function start() {
  try {
    // checks database's connection before running the server.
    await DataSource.$connect();

    app.server.listen(process.env.PORT, () => {
      console.log('Projeto iniciado com sucesso!');
      console.log(`Documentação da API disponível em ${process.env.APP_URL}/api-docs`);
    });

  } catch (err: any) {
    console.log('Erro ao iniciar o projeto!');
    console.log(err);

  }
}

start();
