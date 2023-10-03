import { z } from 'zod';

export type CreateChatDto = z.output<typeof CreateChat>;
export const CreateChat = z.object({
  name: z.string().trim().min(1).optional().nullable(),
  ids: z.coerce.number().positive().int().array().min(1)
  .transform(
    (ids) => {
      return ids.map(id => {
        return { id };
      });
    },
  ),
});
