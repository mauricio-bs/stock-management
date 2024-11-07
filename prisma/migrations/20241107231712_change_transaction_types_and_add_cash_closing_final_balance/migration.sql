/*
  Warnings:

  - The values [income,expense] on the enum `transaction_type` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `final_balance` to the `cash_closing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "transaction_type_new" AS ENUM ('opening', 'sale', 'receipt', 'widhdrawal', 'supply', 'adjustment_in', 'adjustment_out');
ALTER TABLE "cash_transaction" ALTER COLUMN "type" TYPE "transaction_type_new" USING ("type"::text::"transaction_type_new");
ALTER TYPE "transaction_type" RENAME TO "transaction_type_old";
ALTER TYPE "transaction_type_new" RENAME TO "transaction_type";
DROP TYPE "transaction_type_old";
COMMIT;

-- AlterTable
ALTER TABLE "cash_closing" ADD COLUMN     "final_balance" MONEY NOT NULL;
