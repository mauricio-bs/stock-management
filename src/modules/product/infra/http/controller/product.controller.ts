import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { LogAction } from '@common/decorator/log-actions.decorator';
import { UserInfo } from '@common/decorator/user.decorator';
import { LogActions } from '@common/enum/LogActions';
import { JwtAuthGuard } from '@common/guards/Jwt.guard';
import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { Product } from '@entities/Product';
import { CreateProductDTO } from '@modules/product/domain/dto/create-product.dto';
import { FindAllProductsDTO } from '@modules/product/domain/dto/find-all-products.dto';
import { UpdateProductDTO } from '@modules/product/domain/dto/update-product.dto';
import { IProductService } from '@modules/product/domain/service/IProduct.service';

@UseGuards(JwtAuthGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly service: IProductService) {}

  @LogAction(LogActions.CREATE_PRODUCT)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @UserInfo('company_id') company_id: string,
    @Body() data: CreateProductDTO,
  ): Promise<Product> {
    return await this.service.create({ ...data, company_id });
  }

  @LogAction(LogActions.UPDATE_PRODUCT)
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async update(
    @UserInfo('company_id') company_id: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateProductDTO,
  ): Promise<Product> {
    return await this.service.update(id, { ...data, company_id });
  }

  @LogAction(LogActions.DELETE_PRODUCT)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(
    @UserInfo('company_id') company_id: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    await this.service.delete(id, company_id);
  }

  @LogAction(LogActions.GET_ONE_PRODUCT)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOneById(
    @UserInfo('company_id') company_id: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Product> {
    return await this.service.findOneById(id, company_id);
  }

  @LogAction(LogActions.GET_PRODUCTS)
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(
    @UserInfo('company_id') company_id: string,
    @Query() filters: FindAllProductsDTO,
  ): Promise<PaginatedResult<Product>> {
    return await this.service.findAll({ ...filters, company_id });
  }
}
