export interface EventsResponstDTO {
  id: number;
  title: string;
  description: string;
  fee: number;
  startDateTime: Date;
  endDateTime: Date;
  location: string;
  signUpDeadline: Date;
  rsvpLink?: string | null;
  imageUrl?: string | null;
  updatedAt: Date;
}

export interface EventsCreateDTO {
  title: string;
  description: string;
  fee: number;
  startDateTime: Date;
  endDateTime: Date;
  location: string;
  signUpDeadline: Date;
  rsvpLink?: string;
  imageUrl?: string;
  updatedAt: Date;
}

export interface EventsUpdateDTO {
  title?: string;
  description?: string;
  fee?: number;
  startDateTime?: Date;
  endDateTime?: Date;
  location?: string;
  signUpDeadline?: Date;
  rsvpLink?: string;
  imageUrl?: string;
}
