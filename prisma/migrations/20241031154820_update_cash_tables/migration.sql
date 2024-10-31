/*
  Warnings:

  - A unique constraint covering the columns `[cash_id]` on the table `cash_closing` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "cash_closing_cash_id_key" ON "cash_closing"("cash_id");

-- CreateIndex
CREATE INDEX "cash_closing_id_cash_id_idx" ON "cash_closing"("id", "cash_id");

-- CreateIndex
CREATE INDEX "cash_transaction_id_cash_id_idx" ON "cash_transaction"("id", "cash_id");

-- CreateIndex
CREATE INDEX "cash_withdrawal_id_cash_id_idx" ON "cash_withdrawal"("id", "cash_id");
