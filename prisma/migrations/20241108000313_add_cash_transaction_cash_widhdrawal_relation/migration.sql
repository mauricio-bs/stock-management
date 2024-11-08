/*
  Warnings:

  - A unique constraint covering the columns `[transaction_id]` on the table `cash_withdrawal` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `transaction_id` to the `cash_withdrawal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cash_withdrawal" ADD COLUMN     "transaction_id" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cash_withdrawal_transaction_id_key" ON "cash_withdrawal"("transaction_id");

-- AddForeignKey
ALTER TABLE "cash_withdrawal" ADD CONSTRAINT "cash_withdrawal_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "cash_transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
