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
} from '@nestjs/common';

import { LogAction } from '@common/decorator/log-actions.decorator';
import { UserInfo } from '@common/decorator/user.decorator';
import { LogActions } from '@common/enum/LogActions';
import { JwtAuthGuard } from '@common/guards/Jwt.guard';
import { IUserInfo } from '@common/interfaces/IUserInfo';
import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { globalHttpErrorHandler } from '@common/utils/error/global-error-handler';
import { Cash } from '@entities/Cash';
import { FindAllCashesDTO } from '@modules/cash/domain/dto/cash/find-all-cashies.dto';
import { OpenCashDTO } from '@modules/cash/domain/dto/cash/open-cash.dto';
import { CloseCashDTO } from '@modules/cash/domain/dto/closure/close-cash.dto';
import { ICashService } from '@modules/cash/domain/service/ICash.service';

@Controller('cash')
export class CashController {
  constructor(private readonly cashService: ICashService) {}

  @LogAction(LogActions.OPEN_CASH)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async open(
    @UserInfo() user: IUserInfo,
    @Body() data: OpenCashDTO,
  ): Promise<Cash> {
    try {
      return await this.cashService.open({
        ...data,
        opened_by_user_id: user.id,
        company_id: user.company_id,
      });
    } catch (error) {
      throw globalHttpErrorHandler(error);
    }
  }

  @LogAction(LogActions.CLOSE_CASH)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async close(
    @UserInfo() user: IUserInfo,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: CloseCashDTO,
  ): Promise<Cash> {
    try {
      return await this.cashService.close(id, {
        ...data,
        user_id: user.id,
        company_id: user.company_id,
      });
    } catch (error) {
      throw globalHttpErrorHandler(error);
    }
  }

  @LogAction(LogActions.GET_ONE_CASH)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(
    @UserInfo('company_id') company_id: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Cash> {
    try {
      return await this.cashService.findOneById(id, company_id);
    } catch (error) {
      throw globalHttpErrorHandler(error);
    }
  }

  @LogAction(LogActions.GET_CASHIES)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(
    @UserInfo('company_id') company_id: string,
    @Query() filters: FindAllCashesDTO,
  ): Promise<PaginatedResult<Cash>> {
    try {
      return await this.cashService.findAll({ ...filters, company_id });
    } catch (error) {
      throw globalHttpErrorHandler(error);
    }
  }
}
