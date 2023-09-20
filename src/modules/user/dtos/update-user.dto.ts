import { z } from 'zod';
import { CreateUser } from './create-user.dto';

export type UpdateUserDto = z.output<typeof UpdateUser>;
export const UpdateUser = CreateUser.omit({ password: true });
