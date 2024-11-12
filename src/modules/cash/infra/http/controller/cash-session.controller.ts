import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { LogAction } from '@common/decorator/log-actions.decorator';
import { UserInfo } from '@common/decorator/user.decorator';
import { LogActions } from '@common/enum/LogActions';
import { JwtAuthGuard } from '@common/guards/Jwt.guard';
import { IUserInfo } from '@common/interfaces/IUserInfo';
import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { CashSession } from '@entities/CashSession';
import { CloseCashSessionDTO } from '@modules/cash/domain/dto/session/close-cash.dto';
import { FindAllCashSessionsDTO } from '@modules/cash/domain/dto/session/find-all-cash-sessions.dto';
import { OpenCashSessionDTO } from '@modules/cash/domain/dto/session/open-cash.dto';
import { ICashSessionService } from '@modules/cash/domain/service/ICashSession.service';

@Controller('cash/:cash_id/session')
export class CashSessionController {
  constructor(private readonly service: ICashSessionService) {}

  @LogAction(LogActions.OPEN_CASH)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('open')
  async open(
    @UserInfo() user: IUserInfo,
    @Param('cash_id', ParseUUIDPipe) cash_id: string,
    @Body() data: OpenCashSessionDTO,
  ): Promise<CashSession> {
    return await this.service.open(cash_id, {
      ...data,
      company_id: user.company_id,
      opened_by_user_id: user.id,
    });
  }

  @LogAction(LogActions.CLOSE_CASH)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async close(
    @UserInfo() user: IUserInfo,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: CloseCashSessionDTO,
  ): Promise<CashSession> {
    return await this.service.close(id, {
      ...data,
      company_id: user.company_id,
      user_id: user.id,
    });
  }

  @LogAction(LogActions.GET_ONE_CASH_SESSION)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<CashSession> {
    return await this.service.findOne(id);
  }

  @LogAction(LogActions.GET_CASH_SESSIONS)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(
    @UserInfo('company_id') company_id: string,
    @Query() filters: FindAllCashSessionsDTO,
  ): Promise<PaginatedResult<CashSession>> {
    return await this.service.findAll({ ...filters, company_id });
  }
}
