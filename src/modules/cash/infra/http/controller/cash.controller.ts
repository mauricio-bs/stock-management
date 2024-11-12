import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
  ParseUUIDPipe,
  Query,
  Delete,
} from '@nestjs/common';

import { LogAction } from '@common/decorator/log-actions.decorator';
import { UserInfo } from '@common/decorator/user.decorator';
import { LogActions } from '@common/enum/LogActions';
import { JwtAuthGuard } from '@common/guards/Jwt.guard';
import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { Cash } from '@entities/Cash';
import { CreateCashDTO } from '@modules/cash/domain/dto/cash/create-cash.dto';
import { FindAllCashiesDTO } from '@modules/cash/domain/dto/cash/find-all-cashies.dto';
import { CloseCashDTO } from '@modules/cash/domain/dto/closure/close-cash.dto';
import { ICashService } from '@modules/cash/domain/service/ICash.service';

@Controller('cash')
export class CashController {
  constructor(private readonly service: ICashService) {}

  @LogAction(LogActions.CREATE_CASH)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @UserInfo('company_id') company_id: string,
    @Body() data: CreateCashDTO,
  ): Promise<Cash> {
    return await this.service.create({ ...data, company_id });
  }

  @LogAction(LogActions.UPDATE_CASH)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @UserInfo('company_id') company_id: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: CloseCashDTO,
  ): Promise<Cash> {
    return await this.service.update(id, {
      ...data,
      company_id,
    });
  }

  @LogAction(LogActions.DELETE_CASH)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(
    @UserInfo('company_id') company_id: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    await this.service.delete(id, company_id);
  }

  @LogAction(LogActions.GET_ONE_CASH)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(
    @UserInfo('company_id') company_id: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Cash> {
    return await this.service.findOneById(id, company_id);
  }

  @LogAction(LogActions.GET_CASHIES)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(
    @UserInfo('company_id') company_id: string,
    @Query() filters: FindAllCashiesDTO,
  ): Promise<PaginatedResult<Cash>> {
    return await this.service.findAll({ ...filters, company_id });
  }
}
