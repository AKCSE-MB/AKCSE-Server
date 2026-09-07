-- AlterTable
ALTER TABLE "events" ADD COLUMN     "image_public_id" VARCHAR(255);

-- AlterTable
ALTER TABLE "executives" ADD COLUMN     "image_public_id" VARCHAR(255);

-- DropColumn
-- Images are delivered from Cloudinary and the url is built per request from
-- image_public_id, so the stored full url is dropped. Existing image_url values
-- point at a different host and cannot be converted into a public id, they have
-- to be re-uploaded to Cloudinary and backfilled into image_public_id.
ALTER TABLE "events" DROP COLUMN "image_url";

-- DropColumn
ALTER TABLE "executives" DROP COLUMN "image_url";
