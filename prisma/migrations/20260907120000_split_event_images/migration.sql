-- CreateTable
CREATE TABLE "event_images" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "public_id" VARCHAR(255) NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "event_images_event_id_position_idx" ON "event_images"("event_id", "position");

-- AddForeignKey
ALTER TABLE "event_images" ADD CONSTRAINT "event_images_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Backfill
-- An event used to hold at most one image, so every existing public id becomes
-- the first image of its event and no data is lost by dropping the column.
INSERT INTO "event_images" ("event_id", "public_id", "position")
SELECT "id", btrim("image_public_id"), 0
FROM "events"
WHERE "image_public_id" IS NOT NULL AND btrim("image_public_id") <> '';

-- DropColumn
ALTER TABLE "events" DROP COLUMN "image_public_id";
