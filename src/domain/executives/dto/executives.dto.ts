import { tags } from 'typia';

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
   * executive image url, empty string if not set
   * @type string
   */
  imageUrl: string & tags.Example<'https://cdn.akcse.org/team/president.png'>;
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
