import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';

import { LogAction } from '@common/decorator/log-actions.decorator';
import { UserInfo } from '@common/decorator/user.decorator';
import { LogActions } from '@common/enum/log-actions';
import { JwtAuthGuard } from '@common/guards/Jwt.guard';
import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { globalHttpErrorHandler } from '@common/utils/error/global-error-handler';
import { Sale } from '@entities/Sale';
import { CreateSaleDTO } from '@modules/sale/domain/dto/create-sale.dto';
import { FindAllSalesDTO } from '@modules/sale/domain/dto/find-all-sales.dto';
import { UpdateSaleDTO } from '@modules/sale/domain/dto/update-sale.dto';
import { ISaleService } from '@modules/sale/domain/service/ISale.service';

@Controller('sale')
export class SaleController {
  constructor(private readonly service: ISaleService) {}

  @LogAction(LogActions.CREATE_SALE)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @UserInfo('company_id') company_id: string,
    @Body() data: CreateSaleDTO,
  ): Promise<Sale> {
    try {
      return await this.service.create({ ...data, company_id });
    } catch (error) {
      throw globalHttpErrorHandler(error);
    }
  }

  @LogAction(LogActions.UPDATE_SALE)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @UserInfo('company_id') company_id: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateSaleDTO,
  ): Promise<Sale> {
    try {
      return await this.service.update(id, { ...data, company_id });
    } catch (error) {
      throw globalHttpErrorHandler(error);
    }
  }

  @LogAction(LogActions.DELETE_SALE)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(
    @UserInfo('company_id') company_id: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    try {
      return await this.service.delete(id, company_id);
    } catch (error) {
      throw globalHttpErrorHandler(error);
    }
  }

  @LogAction(LogActions.GET_ONE_SALE)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(
    @UserInfo('company_id') company_id: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Sale> {
    try {
      return await this.service.findOneById(id, company_id);
    } catch (error) {
      throw globalHttpErrorHandler(error);
    }
  }

  @LogAction(LogActions.GET_SALES)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(
    @Query() filters: FindAllSalesDTO,
  ): Promise<PaginatedResult<Sale>> {
    try {
      return await this.service.findAll(filters);
    } catch (error) {
      throw globalHttpErrorHandler(error);
    }
  }
}
