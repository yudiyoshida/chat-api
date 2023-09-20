import { Router } from 'express';

// import Auth from '@middlewares/auth';
import multer from 'multer';
import multerOptions from '@config/storage';
import Controller from './upload-file.controller';

const router = Router();

router
.route('/')
.post(
  // Auth.authentication,
  multer(multerOptions).single('file'),
  Controller.upload,
);

export default router;
