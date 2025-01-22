/*
  Warnings:

  - You are about to drop the column `password` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `members` table. All the data in the column will be lost.
  - Added the required column `role` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "password",
ADD COLUMN     "role" VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE "members" DROP COLUMN "role";
