/*
  Warnings:

  - You are about to drop the column `image_public_id` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `image_public_id` on the `executives` table. All the data in the column will be lost.
  - Added the required column `bio` to the `executives` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "image_public_id",
ADD COLUMN     "image_url" VARCHAR(512);

-- AlterTable
ALTER TABLE "executives" DROP COLUMN "image_public_id",
ADD COLUMN     "bio" VARCHAR(250) NOT NULL,
ADD COLUMN     "image_url" VARCHAR(512);
