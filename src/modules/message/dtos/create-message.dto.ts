import { z } from 'zod';

export type CreateMessageDto = z.output<typeof CreateMessage>;
export const CreateMessage = z.object({
  chatId: z.coerce.number().positive().int(),
  content: z.string().trim().min(1),
});
