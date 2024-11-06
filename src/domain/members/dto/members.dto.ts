// Needed when creating a new member
export interface CreateMembersDTO {
  score: number;
  numAttend: number;
  name: string;
  username: string;
  program: string;
  role: string;
}

export interface MembersResponseDTO {
  id: number;
  score: number;
  numAttend: number;
  name: string;
  username: string;
  program: string;
  role: string;
}

export interface topMemberDTO {
  id: number;
  username: string;
  score: number;
  numAttend: number;
}
