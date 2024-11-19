-- CreateTable
CREATE TABLE "members" (
    "id" SERIAL NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "num_attend" INTEGER NOT NULL DEFAULT 0,
    "name" VARCHAR(25) NOT NULL,
    "username" VARCHAR(25) NOT NULL,
    "program" VARCHAR(25) NOT NULL, 
    "role" VARCHAR(10) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);
