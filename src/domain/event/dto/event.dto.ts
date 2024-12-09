export interface GetEventsOutput {
  id: number;
  title: string;
  description: string;
  fee: number;
  startDateTime: Date;
  endDateTime: Date;
  location: string;
  signUpDeadline: Date;
  createdAt: Date;
  updatedAt: Date;
  rsvpLink: string;
  imageUrl: string;
}
