import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseUUIDPipe,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';

import { LogAction } from '@common/decorator/log-actions.decorator';
import { UserInfo } from '@common/decorator/user.decorator';
import { ESaleStatus } from '@common/enum/ESaleStatus';
import { LogActions } from '@common/enum/LogActions';
import { JwtAuthGuard } from '@common/guards/Jwt.guard';
import { IUserInfo } from '@common/interfaces/IUserInfo';
import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
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
    @UserInfo() user: IUserInfo,
    @Body() data: CreateSaleDTO,
  ): Promise<Sale> {
    return await this.service.create({
      ...data,
      user_id: user.id,
      company_id: user.company_id,
    });
  }

  @LogAction(LogActions.UPDATE_SALE)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @UserInfo() user: IUserInfo,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateSaleDTO,
  ): Promise<Sale> {
    return await this.service.update(id, {
      ...data,
      user_id: user.id,
      company_id: user.company_id,
    });
  }

  @LogAction(LogActions.DELETE_SALE)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('/cancel/:id')
  async cancel(
    @UserInfo('company_id') company_id: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Sale> {
    return await this.service.update(id, {
      company_id,
      status: ESaleStatus.canceled,
    });
  }

  @LogAction(LogActions.GET_ONE_SALE)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(
    @UserInfo('company_id') company_id: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Sale> {
    return await this.service.findOneById(id, company_id);
  }

  @LogAction(LogActions.GET_SALES)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(
    @UserInfo('company_id') company_id: string,
    @Query() filters: FindAllSalesDTO,
  ): Promise<PaginatedResult<Sale>> {
    return await this.service.findAll({ ...filters, company_id });
  }
}
