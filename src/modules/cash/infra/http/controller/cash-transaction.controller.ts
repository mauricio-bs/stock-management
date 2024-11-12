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
import { CashTransaction } from '@entities/CashTransaction';
import { CreateCashTransactionDTO } from '@modules/cash/domain/dto/transaction/create-cash-transaction.dto';
import { UpdateCashTransactionDTO } from '@modules/cash/domain/dto/transaction/update-cash-transaction.dto';
import { ICashTransactionService } from '@modules/cash/domain/service/ICashTransaction.service';

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
    return await this.service.create({ ...data, user_id });
  }

  @LogAction(LogActions.UPDATE_CASH_TRANSACTION)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateCashTransactionDTO,
  ): Promise<CashTransaction> {
    return await this.service.update(id, data);
  }

  @LogAction(LogActions.DELETE_CASH_TRANSACTION)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.service.delete(id);
  }

  @LogAction(LogActions.GET_ONE_CASH_TRANSACTION)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<CashTransaction> {
    return await this.service.findOneById(id);
  }
}
