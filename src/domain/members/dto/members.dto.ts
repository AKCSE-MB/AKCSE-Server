import { Program, Role } from '../members.enum';

export interface MemberCreateRequestDTO {
  score: number;
  numAttend: number;
  name: string;
  username: string;
  program: Program;
  role: Role;
}

export interface MemberUpdateRequestDTO {
  score?: number;
  numAttend?: number;
  name?: string;
  username?: string;
  program?: Program;
  role?: Role;
}

export interface MembersResponseDTO {
  id: number;
  score: number;
  numAttend: number;
  name: string;
  username: string;
  program: Program;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface TopMemberResponseDTO {
  id: number;
  username: string;
  score: number;
  numAttend: number;
}
