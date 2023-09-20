import fs from 'fs';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options = {
    key: fs.readFileSync(process.env.SSL_KEY as string),
    cert: fs.readFileSync(process.env.SSL_CERT as string),
    ca: fs.readFileSync(process.env.SSL_CA as string),
  };
}

export default options;
