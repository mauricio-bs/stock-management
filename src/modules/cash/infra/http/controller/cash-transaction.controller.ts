import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { LogAction } from '@common/decorator/log-actions.decorator';
import { UserInfo } from '@common/decorator/user.decorator';
import { LogActions } from '@common/enum/LogActions';
import { JwtAuthGuard } from '@common/guards/Jwt.guard';
import { globalHttpErrorHandler } from '@common/utils/error/global-error-handler';
import { CashTransaction } from '@entities/CashTransaction';
import { CreateCashTransactionDTO } from '@modules/cash/domain/dto/transaction/create-cash-transaction.dto';
import { ICashTransactionService } from '@modules/cash/domain/service/ICashTransaction.service';
import { UpdateCashTransactionDTO } from '@modules/cash/domain/dto/transaction/update-cash-transaction.dto';

@Controller('cash/transaction')
export class CashTransactionController {
  constructor(private readonly service: ICashTransactionService) {}

  @LogAction(LogActions.CREATE_CASH_TRANSACTION)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @UserInfo('id') user_id: string,
    @Body() data: CreateCashTransactionDTO,
  ): Promise<CashTransaction> {
    try {
      return await this.service.create({ ...data, user_id });
    } catch (error) {
      throw globalHttpErrorHandler(error);
    }
  }

  @LogAction(LogActions.UPDATE_CASH_TRANSACTION)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateCashTransactionDTO,
  ): Promise<CashTransaction> {
    try {
      return await this.service.update(id, data);
    } catch (error) {
      throw globalHttpErrorHandler(error);
    }
  }

  @LogAction(LogActions.DELETE_CASH_TRANSACTION)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    try {
      return await this.service.delete(id);
    } catch (error) {
      throw globalHttpErrorHandler(error);
    }
  }

  @LogAction(LogActions.GET_ONE_CASH_TRANSACTION)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<CashTransaction> {
    try {
      return await this.service.findOneById(id);
    } catch (error) {
      throw globalHttpErrorHandler(error);
    }
  }
}
