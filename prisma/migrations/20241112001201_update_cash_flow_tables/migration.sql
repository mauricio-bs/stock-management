/*
  Warnings:

  - You are about to drop the column `closed_by_user_id` on the `cash` table. All the data in the column will be lost.
  - You are about to drop the column `closing_at` on the `cash` table. All the data in the column will be lost.
  - You are about to drop the column `closing_balance` on the `cash` table. All the data in the column will be lost.
  - You are about to drop the column `opened_by_user_id` on the `cash` table. All the data in the column will be lost.
  - You are about to drop the column `opening_at` on the `cash` table. All the data in the column will be lost.
  - You are about to drop the column `opening_balance` on the `cash` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `cash` table. All the data in the column will be lost.
  - You are about to drop the column `cash_id` on the `cash_closing` table. All the data in the column will be lost.
  - You are about to drop the column `cash_id` on the `cash_transaction` table. All the data in the column will be lost.
  - You are about to drop the column `cash_id` on the `cash_withdrawal` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cash_session_id]` on the table `cash_closing` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `cash` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cash_session_id` to the `cash_closing` table without a default value. This is not possible if the table is not empty.
  - Made the column `user_id` on table `cash_transaction` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `cash_session_id` to the `cash_withdrawal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cash" DROP CONSTRAINT "cash_closed_by_user_id_fkey";

-- DropForeignKey
ALTER TABLE "cash" DROP CONSTRAINT "cash_opened_by_user_id_fkey";

-- DropForeignKey
ALTER TABLE "cash_closing" DROP CONSTRAINT "cash_closing_cash_id_fkey";

-- DropForeignKey
ALTER TABLE "cash_transaction" DROP CONSTRAINT "cash_transaction_cash_id_fkey";

-- DropForeignKey
ALTER TABLE "cash_withdrawal" DROP CONSTRAINT "cash_withdrawal_cash_id_fkey";

-- DropIndex
DROP INDEX "cash_closing_cash_id_key";

-- DropIndex
DROP INDEX "cash_closing_id_cash_id_idx";

-- DropIndex
DROP INDEX "cash_transaction_id_cash_id_idx";

-- DropIndex
DROP INDEX "cash_withdrawal_id_cash_id_idx";

-- AlterTable
ALTER TABLE "cash" DROP COLUMN "closed_by_user_id",
DROP COLUMN "closing_at",
DROP COLUMN "closing_balance",
DROP COLUMN "opened_by_user_id",
DROP COLUMN "opening_at",
DROP COLUMN "opening_balance",
DROP COLUMN "status",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "cash_closing" DROP COLUMN "cash_id",
ADD COLUMN     "cash_session_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "cash_transaction" DROP COLUMN "cash_id",
ADD COLUMN     "cash_session_id" UUID,
ADD COLUMN     "transaction_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "user_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "cash_withdrawal" DROP COLUMN "cash_id",
ADD COLUMN     "cash_session_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "installment" ADD COLUMN     "receivied_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "cash_session" (
    "id" UUID NOT NULL,
    "opening_balance" MONEY NOT NULL,
    "closing_balance" MONEY,
    "opening_at" TIMESTAMP(3) NOT NULL,
    "closing_at" TIMESTAMP(3),
    "status" "cash_status" NOT NULL DEFAULT 'open',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "company_id" UUID NOT NULL,
    "cash_id" UUID NOT NULL,
    "opened_by_user_id" UUID NOT NULL,
    "closed_by_user_id" UUID,

    CONSTRAINT "cash_session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "cash_session_id_company_id_idx" ON "cash_session"("id", "company_id");

-- CreateIndex
CREATE UNIQUE INDEX "cash_closing_cash_session_id_key" ON "cash_closing"("cash_session_id");

-- CreateIndex
CREATE INDEX "cash_closing_id_cash_session_id_idx" ON "cash_closing"("id", "cash_session_id");

-- CreateIndex
CREATE INDEX "cash_transaction_id_cash_session_id_idx" ON "cash_transaction"("id", "cash_session_id");

-- CreateIndex
CREATE INDEX "cash_withdrawal_id_cash_session_id_idx" ON "cash_withdrawal"("id", "cash_session_id");

-- AddForeignKey
ALTER TABLE "cash_session" ADD CONSTRAINT "cash_session_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cash_session" ADD CONSTRAINT "cash_session_cash_id_fkey" FOREIGN KEY ("cash_id") REFERENCES "cash"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cash_session" ADD CONSTRAINT "cash_session_opened_by_user_id_fkey" FOREIGN KEY ("opened_by_user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cash_session" ADD CONSTRAINT "cash_session_closed_by_user_id_fkey" FOREIGN KEY ("closed_by_user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cash_transaction" ADD CONSTRAINT "cash_transaction_cash_session_id_fkey" FOREIGN KEY ("cash_session_id") REFERENCES "cash_session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cash_withdrawal" ADD CONSTRAINT "cash_withdrawal_cash_session_id_fkey" FOREIGN KEY ("cash_session_id") REFERENCES "cash_session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cash_closing" ADD CONSTRAINT "cash_closing_cash_session_id_fkey" FOREIGN KEY ("cash_session_id") REFERENCES "cash_session"("id") ON DELETE CASCADE ON UPDATE CASCADE;
