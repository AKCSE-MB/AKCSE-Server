-- CreateTable
CREATE TABLE "executives" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "position" VARCHAR(50) NOT NULL,
    "image_url" VARCHAR(512),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "executives_pkey" PRIMARY KEY ("id")
);
