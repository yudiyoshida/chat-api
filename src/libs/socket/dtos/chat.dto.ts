import { z } from 'zod';

export const ChatIdDto = z.coerce.number().positive().int();
