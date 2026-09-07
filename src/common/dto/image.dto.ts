import { tags } from 'typia';

/**
 * Cloudinary delivery urls for a single image, or `null` when the record has
 * no image. Only the public id is persisted, the urls are built per request.
 */
export interface ImageDto {
  /**
   * cloudinary public id, folders included
   * @type string
   */
  publicId: string & tags.Example<'events/fall-networking-2025'>;

  /**
   * up to 1200px wide url
   * @type string
   */
  full: string &
    tags.Example<'https://res.cloudinary.com/akcse/image/upload/w_1200,c_limit,f_auto,q_auto/events/fall-networking-2025'>;
}
