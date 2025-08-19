import { Role } from '@prisma/client';

export interface MemberCreateRequestDTO {
  score: number;
  name: string;
  role: Role;
}

export interface MemberUpdateRequestDTO
  extends Partial<MemberCreateRequestDTO> {}

export interface MembersResponseDTO {
  id: number;
  score: number;
  name: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface TopMembersResponseDTO
  extends Omit<MembersResponseDTO, 'createdAt' | 'updatedAt'> {}

export interface AdminMembersResponseDTO
  extends Omit<MembersResponseDTO, 'score' | 'createdAt' | 'updatedAt'> {}
