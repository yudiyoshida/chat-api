import { AccountRole } from '@prisma/client';

export interface IPayloadDto {
  id: number;
  role: AccountRole;
  name: string;
  email: string;
  iat?: number;
  exp?: number;
}
