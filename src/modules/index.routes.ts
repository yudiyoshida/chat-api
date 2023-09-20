import { Router } from 'express';

import AuthRoutes from './auth/auth.routes';
import UploadFileRoutes from './upload-file/upload-file.routes';

const router = Router();

router.use('/auth', AuthRoutes);
router.use('/upload-file', UploadFileRoutes);

export default router;
