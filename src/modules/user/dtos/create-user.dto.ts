import { z } from 'zod';

export type CreateUserDto = z.output<typeof CreateUser>;
export const CreateUser = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  password: z.string().min(8),
  imageUrl: z.string().url().optional().nullable(),
});
