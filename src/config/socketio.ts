import { ServerOptions } from 'socket.io';

const options: Partial<ServerOptions> = {
  cors: {
    origin: '*',
  },
};

export default options;
