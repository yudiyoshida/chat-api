import { Router } from 'express';

import Auth from '@middlewares/auth';
import Controller from './user.controller';
import Validator from './user.validator';

import multer from 'multer';
import multerOptions from '@config/storage';

const router = Router();

router
.route('/')
.get(
  Auth.authentication,
  Validator.queryParams,
  Controller.findAll,
)
.post(
  multer(multerOptions).single('image'),
  Validator.createOne,
  Controller.createOne,
);

router
.route('/myself')
.all(
  Auth.authentication,
)
.get(
  Controller.findMyself,
)
.put(
  Validator.updateMyself,
  Controller.updateMyself,
)
.delete(
  Controller.deleteMyself,
);

router
.route('/:id')
.get(
  Auth.authentication,
  Validator.pathParams,
  Controller.findOne,
);

export default router;
