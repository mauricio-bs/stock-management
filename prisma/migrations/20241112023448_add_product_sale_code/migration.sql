/*
  Warnings:

  - Added the required column `code` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product" ADD COLUMN     "code" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "sale" ADD COLUMN     "code" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "product_code_company_id_idx" ON "product"("code", "company_id");

-- CreateIndex
CREATE INDEX "sale_code_company_id_idx" ON "sale"("code", "company_id");
