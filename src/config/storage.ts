import crypto from 'crypto';
import multer from 'multer';
import multerS3 from 'multer-s3';

import { Request } from 'express';
import { S3Client } from '@aws-sdk/client-s3';
import AppException from '@errors/app-exception';

const ALLOWED_MIMES = ['image/jpeg', 'image/png'];
const MAX_SIZE_TWO_MEGABYTES = 2 * 1024 * 1024;

const storageTypes = {
  local: multer.diskStorage({
    destination: process.env.STORAGE_LOCAL,
    filename: (req: Request, file: any, callback: any) => {
      const fileHash = crypto.randomBytes(16).toString('hex');
      file.key = `${fileHash}-${file.originalname}`;
      file.location = `${process.env.APP_URL}/files/${file.key}`;
      return callback(null, file.key, file.location);
    },
  }),
  s3: multerS3({
    s3: new S3Client({
      region: process.env.AWS_REGION as string,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      },
    }),
    acl: 'public-read',
    bucket: process.env.AWS_BUCKET_NAME as string,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;
      return callback(null, filename);
    },
  }),
};

export default {
  dest: process.env.STORAGE_LOCAL as string,
  storage: (process.env.STORAGE_TYPE === 'local') ? storageTypes.local : storageTypes.s3,
  limits: {
    fileSize: MAX_SIZE_TWO_MEGABYTES,
  },
  fileFilter: (req: Request, file: any, callback: any) => {
    if (ALLOWED_MIMES.includes(file.mimetype)) {
      return callback(null, true);
    }
    return callback(new AppException(415, 'Tipo de arquivo não suportado.'));
  },
};
