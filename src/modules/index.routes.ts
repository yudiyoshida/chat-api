import { Router } from 'express';

import AuthRoutes from './auth/auth.routes';
import ChatRoutes from './chat/chat.routes';
import MessageRoutes from './message/message.routes';
import UploadFileRoutes from './upload-file/upload-file.routes';
import UserRoutes from './user/user.routes';

const router = Router();

router.use('/auth', AuthRoutes);
router.use('/chats', ChatRoutes);
router.use('/messages', MessageRoutes);
router.use('/upload-file', UploadFileRoutes);
router.use('/users', UserRoutes);

export default router;
