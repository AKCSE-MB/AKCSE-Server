import { Program } from '@domain/members/members.enum';

export interface MemberCreateRequestDTO {
  score: number;
  name: string;
}

export interface MemberUpdateRequestDTO
  extends Partial<MemberCreateRequestDTO> {}

export interface MembersResponseDTO {
  id: number;
  score: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TopMembersResponseDTO
  extends Omit<
    MembersResponseDTO,
    'username' | 'program' | 'createdAt' | 'updatedAt'
  > {}
