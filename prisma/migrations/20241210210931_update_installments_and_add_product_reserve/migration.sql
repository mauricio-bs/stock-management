/*
  Warnings:

  - You are about to drop the column `receivied_at` on the `installment` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "installment_staus" AS ENUM ('pending', 'completed', 'canceled');

-- AlterTable
ALTER TABLE "installment" DROP COLUMN "receivied_at",
ADD COLUMN     "received_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "installment_staus" NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "reserved" DOUBLE PRECISION;
