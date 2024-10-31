/*
  Warnings:

  - Added the required column `user_id` to the `sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_value` to the `sale_items` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "payment_forms" AS ENUM ('credit_card', 'debit_card', 'pix', 'cash', 'bank_slip');

-- CreateEnum
CREATE TYPE "cash_status" AS ENUM ('open', 'closed');

-- CreateEnum
CREATE TYPE "transaction_type" AS ENUM ('income', 'expense');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "unit_measure" ADD VALUE 'L';
ALTER TYPE "unit_measure" ADD VALUE 'ROL';

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "min_stock_quantity" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "sale" ADD COLUMN     "user_id" UUID NOT NULL,
ALTER COLUMN "total_discount" DROP NOT NULL;

-- AlterTable
ALTER TABLE "sale_items" ADD COLUMN     "total_value" MONEY NOT NULL;

-- CreateTable
CREATE TABLE "company_preferences" (
    "id" UUID NOT NULL,
    "default_credit_tax" DOUBLE PRECISION,
    "default_debit_tax" DOUBLE PRECISION,
    "default_payment_form" "payment_forms",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "company_id" UUID NOT NULL,

    CONSTRAINT "company_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" UUID NOT NULL,
    "payment_form" "payment_forms" NOT NULL,
    "total_value" MONEY NOT NULL,
    "installments" INTEGER NOT NULL DEFAULT 1,
    "taxes_per_installment" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "company_id" UUID NOT NULL,
    "sale_id" UUID NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "installment" (
    "id" UUID NOT NULL,
    "installment_number" INTEGER NOT NULL DEFAULT 1,
    "value" MONEY NOT NULL,
    "tax_value" MONEY NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "payment_id" UUID NOT NULL,

    CONSTRAINT "installment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cash" (
    "id" UUID NOT NULL,
    "opening_at" TIMESTAMP(3) NOT NULL,
    "closing_at" TIMESTAMP(3) NOT NULL,
    "opening_balance" MONEY NOT NULL,
    "closing_balance" MONEY,
    "status" "cash_status" NOT NULL DEFAULT 'open',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "company_id" UUID NOT NULL,
    "opened_by_user_id" UUID NOT NULL,
    "closed_by_user_id" UUID,

    CONSTRAINT "cash_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cash_transaction" (
    "id" UUID NOT NULL,
    "type" "transaction_type" NOT NULL,
    "description" TEXT,
    "amount" MONEY NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "cash_id" UUID NOT NULL,
    "sale_id" UUID,
    "user_id" UUID,

    CONSTRAINT "cash_transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cash_withdrawal" (
    "id" UUID NOT NULL,
    "amount" MONEY NOT NULL,
    "reason" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "cash_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "cash_withdrawal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cash_closing" (
    "id" UUID NOT NULL,
    "total_income" MONEY NOT NULL,
    "total_expense" MONEY NOT NULL,
    "difference" MONEY,
    "notes" TEXT,
    "closing_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "cash_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "cash_closing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "payment_id_company_id_idx" ON "payment"("id", "company_id");

-- CreateIndex
CREATE INDEX "cash_id_company_id_idx" ON "cash"("id", "company_id");

-- AddForeignKey
ALTER TABLE "company_preferences" ADD CONSTRAINT "company_preferences_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale" ADD CONSTRAINT "sale_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "installment" ADD CONSTRAINT "installment_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cash" ADD CONSTRAINT "cash_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cash" ADD CONSTRAINT "cash_opened_by_user_id_fkey" FOREIGN KEY ("opened_by_user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cash" ADD CONSTRAINT "cash_closed_by_user_id_fkey" FOREIGN KEY ("closed_by_user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cash_transaction" ADD CONSTRAINT "cash_transaction_cash_id_fkey" FOREIGN KEY ("cash_id") REFERENCES "cash"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cash_transaction" ADD CONSTRAINT "cash_transaction_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "sale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cash_transaction" ADD CONSTRAINT "cash_transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cash_withdrawal" ADD CONSTRAINT "cash_withdrawal_cash_id_fkey" FOREIGN KEY ("cash_id") REFERENCES "cash"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cash_withdrawal" ADD CONSTRAINT "cash_withdrawal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cash_closing" ADD CONSTRAINT "cash_closing_cash_id_fkey" FOREIGN KEY ("cash_id") REFERENCES "cash"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cash_closing" ADD CONSTRAINT "cash_closing_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
