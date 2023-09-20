import { Router } from 'express';

import Auth from '@middlewares/auth';
import Controller from './chat.controller';
import Validator from './chat.validator';

const router = Router();

router
.route('/:id')
.all(
  Auth.authentication,
  Validator.pathParams,
)
.get(
  Controller.findOne,
);

export default router;
