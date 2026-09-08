/**
 * Cloudinary delivery layer.
 *
 * Read-only: URLs are assembled as plain strings from a public id, so neither
 * the Admin API nor the Upload API (and therefore no api key / secret) is
 * involved. Only the cloud name is needed, and it is public by design.
 */

const CLOUDINARY_DELIVERY_ORIGIN = 'https://res.cloudinary.com';

/**
 * Every transformation string the API is allowed to emit. Route handlers and
 * services must reference these constants instead of inlining a transform.
 */
export const IMAGE_TRANSFORMS = {
  CARD: 'w_600,c_limit,f_auto,q_auto',
  FULL: 'w_1200,c_limit,f_auto,q_auto',
} as const;

export type ImageTransform =
  (typeof IMAGE_TRANSFORMS)[keyof typeof IMAGE_TRANSFORMS];

export interface ImagePayload {
  publicId: string;
  full: string;
}

function cloudName(): string {
  const name = process.env.CLOUDINARY_CLOUD_NAME;

  if (!name) {
    throw new Error(
      'CLOUDINARY_CLOUD_NAME is not set, check the env file of the current NODE_ENV',
    );
  }

  return name;
}

/**
 * Build a delivery URL for an already uploaded (public) asset.
 *
 * @param publicId cloudinary public id, folders included e.g. `events/fall-2025`
 * @param transform one of {@link IMAGE_TRANSFORMS}
 */
export function buildUrl(publicId: string, transform: ImageTransform): string {
  const normalized = publicId.trim().replace(/^\/+/, '');

  return `${CLOUDINARY_DELIVERY_ORIGIN}/${cloudName()}/image/upload/${transform}/${normalized}`;
}

/**
 * Shape a public id into the `image` field of an API response.
 *
 * @returns `null` when the record has no image, so the caller can hand the
 *          value straight to the response dto
 */
export function imagePayload(
  publicId: string | null | undefined,
): ImagePayload | null {
  const normalized = publicId?.trim().replace(/^\/+/, '') ?? '';

  if (normalized === '') {
    return null;
  }

  return {
    publicId: normalized,
    full: buildUrl(normalized, IMAGE_TRANSFORMS.FULL),
  };
}

/**
 * Shape an ordered list of public ids into the `images` field of an API
 * response. Blank ids are dropped so the array only holds deliverable images.
 *
 * @returns an empty array when the record has no image, so the caller can hand
 *          the value straight to the response dto
 */
export function imagePayloads(
  publicIds: readonly (string | null | undefined)[],
): ImagePayload[] {
  return publicIds
    .map(imagePayload)
    .filter((payload): payload is ImagePayload => payload !== null);
}
