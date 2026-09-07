-- AlterTable
-- Short self introduction shown on the client's Our Team cards. Nullable so the
-- existing rows do not need a backfill, the api normalizes null into an empty
-- string the same way rsvp_link is handled.
ALTER TABLE "executives" ADD COLUMN     "bio" VARCHAR(300);
