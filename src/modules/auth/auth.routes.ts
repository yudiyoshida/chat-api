import { Router } from 'express';

import Controller from './auth.controller';
import Validator from './auth.validator';

const router = Router();

router
.route('/login')
.post(
  Validator.login,
  Controller.loginUser,
);

export default router;
