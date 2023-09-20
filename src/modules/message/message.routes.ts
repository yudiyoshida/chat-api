import { Router } from 'express';

import Auth from '@middlewares/auth';
import Controller from './message.controller';
import Validator from './message.validator';

const router = Router();

router
.route('/')
.post(
  Auth.authentication,
  Validator.createOne,
  Controller.createOne,
);

export default router;
