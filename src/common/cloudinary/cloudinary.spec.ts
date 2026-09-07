import {
  IMAGE_TRANSFORMS,
  buildUrl,
  imagePayload,
} from '@common/cloudinary/cloudinary';

const CLOUD_NAME = 'test-cloud';
const BASE = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

describe('cloudinary delivery', () => {
  const originalCloudName = process.env.CLOUDINARY_CLOUD_NAME;

  beforeEach(() => {
    process.env.CLOUDINARY_CLOUD_NAME = CLOUD_NAME;
  });

  afterAll(() => {
    process.env.CLOUDINARY_CLOUD_NAME = originalCloudName;
  });

  describe('buildUrl', () => {
    it('should place the transform between the upload segment and the public id', () => {
      expect(buildUrl('shoe1', IMAGE_TRANSFORMS.CARD)).toBe(
        `${BASE}/w_600,c_limit,f_auto,q_auto/shoe1`,
      );
    });

    it('should throw when the cloud name is not configured', () => {
      delete process.env.CLOUDINARY_CLOUD_NAME;

      expect(() => buildUrl('shoe1', IMAGE_TRANSFORMS.FULL)).toThrow(
        'CLOUDINARY_CLOUD_NAME',
      );
    });
  });

  describe('imagePayload', () => {
    it('should return the public id with its full url', () => {
      expect(imagePayload('shoe1')).toEqual({
        publicId: 'shoe1',
        full: `${BASE}/w_1200,c_limit,f_auto,q_auto/shoe1`,
      });
    });

    it('should keep the folder path of a nested public id', () => {
      expect(imagePayload('events/2025/fall-networking')).toEqual({
        publicId: 'events/2025/fall-networking',
        full: `${BASE}/w_1200,c_limit,f_auto,q_auto/events/2025/fall-networking`,
      });
    });

    it('should return null when there is no public id', () => {
      expect(imagePayload(null)).toBeNull();
      expect(imagePayload(undefined)).toBeNull();
      expect(imagePayload('')).toBeNull();
      expect(imagePayload('   ')).toBeNull();
    });

    it('should not build a url from an api key or secret', () => {
      expect(JSON.stringify(imagePayload('team/president'))).not.toMatch(
        /api_key|api_secret|signature/i,
      );
    });
  });
});
