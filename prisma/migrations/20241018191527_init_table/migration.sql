-- CreateTable
CREATE TABLE "accounts" (
    "id" SERIAL NOT NULL,
    "identification" VARCHAR(256) NOT NULL,
    "password" VARCHAR(256) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);
