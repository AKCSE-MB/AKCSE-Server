import { Program } from '@domain/members/members.enum';

export interface MemberCreateRequestDTO {
  score: number;
  numAttend: number;
  name: string;
  username: string;
  program: Program;
}

export interface MemberUpdateRequestDTO
  extends Partial<MemberCreateRequestDTO> {}

export interface MembersResponseDTO {
  id: number;
  score: number;
  numAttend: number;
  name: string;
  username: string;
  program: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TopMembersResponseDTO
  extends Omit<
    MembersResponseDTO,
    'username' | 'program' | 'createdAt' | 'updatedAt'
  > {}
