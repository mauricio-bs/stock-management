-- CreateEnum
CREATE TYPE "unit_measure" AS ENUM ('UN', 'M', 'KG', 'PCT');

-- CreateEnum
CREATE TYPE "sale_status" AS ENUM ('pending', 'completed', 'canceled');

-- CreateTable
CREATE TABLE "company" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "phone" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "document" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "company_id" UUID NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "quantity" DOUBLE PRECISION NOT NULL,
    "cost_value" MONEY NOT NULL,
    "profit_margin" DOUBLE PRECISION NOT NULL,
    "price" MONEY NOT NULL,
    "measure_unit" "unit_measure" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "company_id" UUID NOT NULL,
    "category_id" UUID NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "company_id" UUID NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sale" (
    "id" UUID NOT NULL,
    "total" MONEY NOT NULL,
    "total_discount" MONEY NOT NULL,
    "status" "sale_status" NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "company_id" UUID NOT NULL,

    CONSTRAINT "sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sale_items" (
    "id" UUID NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit_value" MONEY NOT NULL,
    "total_discount" MONEY,
    "unit_discount" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "sale_id" UUID NOT NULL,
    "product_id" UUID NOT NULL,

    CONSTRAINT "sale_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "user_id_company_id_idx" ON "user"("id", "company_id");

-- CreateIndex
CREATE INDEX "product_id_company_id_idx" ON "product"("id", "company_id");

-- CreateIndex
CREATE INDEX "category_id_company_id_idx" ON "category"("id", "company_id");

-- CreateIndex
CREATE INDEX "sale_id_company_id_idx" ON "sale"("id", "company_id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale" ADD CONSTRAINT "sale_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_items" ADD CONSTRAINT "sale_items_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "sale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_items" ADD CONSTRAINT "sale_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
