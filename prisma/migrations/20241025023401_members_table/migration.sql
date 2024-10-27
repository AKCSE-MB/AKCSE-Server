-- CreateTable
CREATE TABLE "members" (
    "id" SERIAL NOT NULL,
    "score" INTEGER NOT NULL,
    "num_attend" INTEGER NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "username" VARCHAR(256) NOT NULL,
    "role" VARCHAR(256) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);
