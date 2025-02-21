export interface EventsResponseDTO {
  /**
   * event id
   * example: 0
   * @type number
   */
  id: number;

  /**
   * event title
   * example: "title"
   * @type string
   */
  title: string;

  /**
   * event description
   * example: "description"
   * @type string
   */
  description: string;

  /**
   * event fee
   * example: 0
   * @type number
   */
  fee: number;

  /**
   * event start date time
   * example: "2024-12-27T00:00:00Z"
   * @type string
   */
  startDateTime: Date;

  /**
   * event end date time
   * example: "2024-12-27T00:00:00Z"
   * @type string
   */
  endDateTime: Date;

  /**
   * event location
   * example: "location"
   * @type string
   */
  location: string;

  /**
   * event sign up deadline
   * example: "2024-12-27T00:00:00Z"
   * @type string
   */
  signUpDeadline: Date;

  /**
   * event created at
   * example: "2024-12-27T00:00:00Z"
   * @type string
   */
  createdAt: Date;

  /**
   * event rsvp link
   * example: "https://google.com"
   * @type string | null
   */
  rsvpLink?: string | null;

  /**
   * event image url
   * example: "https://picsum.photos/200/300"
   * @type string | null
   */
  imageUrl?: string | null;

  /**
   * event updated at
   * example: "2024-12-27T00:00:00Z"
   * @type string
   */
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
