import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  ParseUUIDPipe,
  ForbiddenException,
  Query,
} from '@nestjs/common';

import { LogAction } from '@common/decorator/log-actions.decorator';
import { UserInfo } from '@common/decorator/user.decorator';
import { LogActions } from '@common/enum/log-actions';
import { JwtAuthGuard } from '@common/guards/Jwt.guard';
import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { globalHttpErrorHandler } from '@common/utils/error/global-error-handler';
import { Company } from '@entities/Company';
import { CreateCompanyDTO } from '@modules/company/domain/dto/create-company.dto';
import { FindAllCompaniesDTO } from '@modules/company/domain/dto/find-all-companies.dto';
import { UpdateCompanyDTO } from '@modules/company/domain/dto/update-company.dto';
import { ICompanyService } from '@modules/company/domain/service/ICompany.service';

@Controller('company')
export class CompanyController {
  constructor(private readonly service: ICompanyService) {}

  @LogAction(LogActions.CREATE_CATEGORY)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() data: CreateCompanyDTO): Promise<Company> {
    try {
      return await this.service.create(data);
    } catch (error) {
      throw globalHttpErrorHandler(error);
    }
  }

  @LogAction(LogActions.UPDATE_COMPANY)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @UserInfo('company_id') company_id: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateCompanyDTO,
  ): Promise<Company> {
    try {
      if (id !== company_id)
        throw new ForbiddenException('Cannot update another company');

      return await this.service.update(id, data);
    } catch (error) {
      throw globalHttpErrorHandler(error);
    }
  }

  @LogAction(LogActions.DELETE_COMPANY)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(
    @UserInfo('company_id') company_id: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    try {
      if (id !== company_id)
        throw new ForbiddenException('Cannot delete another company');

      await this.service.delete(id);
    } catch (error) {
      throw globalHttpErrorHandler(error);
    }
  }

  @LogAction(LogActions.GET_ONE_COMPANY)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Company> {
    try {
      return await this.service.findOneById(id);
    } catch (error) {
      throw globalHttpErrorHandler(error);
    }
  }

  @LogAction(LogActions.GET_COMPANIES)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(
    @Query() filters: FindAllCompaniesDTO,
  ): Promise<PaginatedResult<Company>> {
    try {
      return await this.service.findAll(filters);
    } catch (error) {
      throw globalHttpErrorHandler(error);
    }
  }
}
