-- CreateTable
CREATE TABLE "tokens" (
    "id" SERIAL NOT NULL,
    "account_id" INTEGER NOT NULL,
    "access_token" VARCHAR(512) NOT NULL,
    "refresh_token" VARCHAR(512) NOT NULL,
    "access_token_expired_at" TIMESTAMP(3) NOT NULL,
    "refresh_token_expired_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);
