import { tags } from 'typia';
import { ImageDto } from '@common/dto/image.dto';

export interface EventResponseDto {
  /**
   * event id
   * @type number
   */
  id: number & tags.Example<1>;

  /**
   * event title
   * @type string
   */
  title: string & tags.Example<'2025 AKCSE Fall Networking Night'>;

  /**
   * event description
   * @type string
   */
  description: string &
    tags.Example<'Join fellow AKCSE members for an evening of networking, food, and career talks.'>;

  /**
   * event fee in CAD, 0 for free events
   * @type number
   * @minimum 0
   */
  fee: number & tags.Minimum<0> & tags.Example<15>;

  /**
   * event start date time
   * example: "2025-10-18T18:00:00Z"
   * @type string
   */
  startDateTime: Date;

  /**
   * event end date time
   * example: "2025-10-18T21:00:00Z"
   * @type string
   */
  endDateTime: Date;

  /**
   * event location
   * @type string
   */
  location: string & tags.Example<'Georgia Tech Student Center, Atlanta, GA'>;

  /**
   * event sign up deadline
   * example: "2025-10-15T23:59:00Z"
   * @type string
   */
  signUpDeadline: Date;

  /**
   * event rsvp link, empty string if not set
   * @type string
   */
  rsvpLink: string & tags.Example<'https://forms.gle/akcse-fall-networking'>;

  /**
   * event image delivery urls, ordered, empty array if the event has no image
   */
  images: ImageDto[];

  /**
   * event created at
   * example: "2025-08-01T09:12:34Z"
   * @type string
   */
  createdAt: Date;

  /**
   * event updated at
   * example: "2025-08-03T14:02:11Z"
   * @type string
   */
  updatedAt: Date;
}
