-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "description" VARCHAR(300) NOT NULL,
    "fee" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "start_date_time" TIMESTAMP(3) NOT NULL,
    "end_date_time" TIMESTAMP(3) NOT NULL,
    "location" VARCHAR(30) NOT NULL,
    "sign_up_deadline" TIMESTAMP(3) NOT NULL,
    "rsvp_link" VARCHAR(256),
    "image_url" VARCHAR(512),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);
