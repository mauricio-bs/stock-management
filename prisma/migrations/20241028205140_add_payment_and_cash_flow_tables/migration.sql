/*
  Warnings:

  - You are about to drop the column `value` on the `installment` table. All the data in the column will be lost.
  - You are about to drop the column `installments` on the `payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[company_id]` on the table `company_preferences` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `amount` to the `installment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cash" ALTER COLUMN "closing_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "installment" DROP COLUMN "value",
ADD COLUMN     "amount" MONEY NOT NULL,
ALTER COLUMN "tax_value" DROP NOT NULL;

-- AlterTable
ALTER TABLE "payment" DROP COLUMN "installments",
ADD COLUMN     "installments_quantity" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX "company_preferences_company_id_key" ON "company_preferences"("company_id");
