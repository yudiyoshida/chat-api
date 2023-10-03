import { Router } from 'express';

import Auth from '@middlewares/auth';
import Controller from './chat.controller';
import Validator from './chat.validator';

const router = Router();

router
.route('/')
.all(
  Auth.authentication,
  Validator.queryParams,
)
.get(
  Controller.findAll,
)
.post(
  Controller.create,
);

router
.route('/:id')
.all(
  Auth.authentication,
  Validator.pathParams,
)
.get(
  Controller.findById,
);

export default router;
