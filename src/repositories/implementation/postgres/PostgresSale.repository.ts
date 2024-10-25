import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@common/database/service/prisma.service';
import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { Sale } from '@entities/Sale';
import { CreateSaleDTO } from '@modules/sale/domain/dto/create-sale.dto';
import { FindAllSalesDTO } from '@modules/sale/domain/dto/find-all-sales.dto';
import { UpdateSaleDTO } from '@modules/sale/domain/dto/update-sale.dto';
import { ISaleRepository } from '@repositories/ISale.repository';

@Injectable()
export class PostgresSaleRepository implements ISaleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    company_id,
    sale_items,
    ...data
  }: CreateSaleDTO): Promise<Sale> {
    return (await this.prisma.sale.create({
      data: {
        ...data,
        company: { connect: { id: company_id } },
        sale_items: { createMany: { data: sale_items } },
      },
    })) as unknown as Sale;
  }

  async update(
    id: string,
    { company_id, sale_items, ...data }: UpdateSaleDTO,
  ): Promise<Sale> {
    return (await this.prisma.sale.update({
      where: { id, company_id },
      data: {
        ...data,
        sale_items: {
          deleteMany: {},
          createMany: { data: sale_items, skipDuplicates: false },
        },
      },
    })) as unknown as Sale;
  }

  async delete(id: string, company_id: string): Promise<void> {
    await this.prisma.sale.delete({ where: { id, company_id } });
  }

  async findOneByPk(id: string, company_id?: string): Promise<Sale> {
    return (await this.prisma.sale.findUnique({
      where: { id, company_id },
    })) as unknown as Sale;
  }

  async findAll({
    page,
    limit,
    ...filters
  }: FindAllSalesDTO): Promise<PaginatedResult<Sale>> {
    const where: Prisma.SaleWhereInput = { ...filters };

    const [total, sales] = await this.prisma.$transaction([
      this.prisma.sale.count({ where }),
      this.prisma.sale.findMany({
        where,
        include: {
          sale_items: {
            include: {
              product: {
                select: { id: true, name: true },
              },
            },
          },
        },
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { created_at: 'desc' },
      }),
    ]);

    return { page, total, data: sales as unknown as Sale[] };
  }
}
