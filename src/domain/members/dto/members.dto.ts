import { Program, Role } from '@domain/members/members.enum';

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
  program: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TopMembersResponseDTO {
  id: number;
  username: string;
  score: number;
  numAttend: number;
}
