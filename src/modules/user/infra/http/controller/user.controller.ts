import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common';

import { LogAction } from '@common/decorator/log-actions.decorator';
import { UserInfo } from '@common/decorator/user.decorator';
import { LogActions } from '@common/enum/LogActions';
import { JwtAuthGuard } from '@common/guards/Jwt.guard';
import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { User } from '@entities/User';
import { CreateUserDTO } from '@modules/user/domain/dto/create-user.dto';
import { FindAllUsersDTO } from '@modules/user/domain/dto/find-all-users.dto';
import { UpdateUserPasswordDTO } from '@modules/user/domain/dto/update-user-password.dto';
import { UpdateUserDTO } from '@modules/user/domain/dto/update-user.dto';
import { IUserService } from '@modules/user/domain/service/IUser.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: IUserService) {}

  @LogAction(LogActions.CREATE_USER)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() data: CreateUserDTO): Promise<Omit<User, 'password'>> {
    return await this.service.create(data);
  }

  @LogAction(LogActions.UPDATE_USER)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @UserInfo('company_id') company_id: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateUserDTO,
  ): Promise<Omit<User, 'password'>> {
    return await this.service.update(id, { ...data, company_id });
  }

  @LogAction(LogActions.UPDATE_USER_PASSWORD)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id/change-password')
  async changePassword(
    @UserInfo('company_id') company_id: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateUserPasswordDTO,
  ): Promise<void> {
    await this.service.updatePassword(id, { ...data, company_id });
  }

  @LogAction(LogActions.GET_ONE_USER)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(
    @UserInfo('company_id') company_id: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Omit<User, 'password'>> {
    return await this.service.findOneById(id, company_id);
  }

  @LogAction(LogActions.GET_USERS)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(
    @UserInfo('company_id') company_id: string,
    @Query() filters: FindAllUsersDTO,
  ): Promise<PaginatedResult<Omit<User, 'password'>>> {
    return await this.service.findAll({ ...filters, company_id });
  }
}
