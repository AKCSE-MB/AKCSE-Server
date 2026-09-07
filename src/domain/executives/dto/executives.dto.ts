import { tags } from 'typia';
import { ImageDto } from '@common/dto/image.dto';

export interface ExecutiveResponseDto {
  /**
   * executive id
   * @type number
   */
  id: number & tags.Example<1>;
  /**
   * executive name
   * @type string
   */
  name: string & tags.Example<'Donggeon Yang'>;
  /**
   * executive position
   * @type string
   */
  position: string & tags.Example<'President'>;
  /**
   * executive bio, empty string if not set
   * @type string
   */
  bio: string &
    tags.Example<'Statistics major dedicated to transforming complex data into actionable insights.'>;
  /**
   * executive image delivery urls, null if not set
   */
  image: ImageDto | null;
  /**
   * executive created at
   * example: "2025-08-01T09:12:34Z"
   * @type string
   */
  createdAt: Date;
  /**
   * executive updated at
   * example: "2025-08-03T14:02:11Z"
   * @type string
   */
  updatedAt: Date;
}
