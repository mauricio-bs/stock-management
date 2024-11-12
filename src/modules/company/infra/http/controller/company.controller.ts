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
  ForbiddenException,
  Query,
} from '@nestjs/common';

import { LogAction } from '@common/decorator/log-actions.decorator';
import { UserInfo } from '@common/decorator/user.decorator';
import { LogActions } from '@common/enum/LogActions';
import { JwtAuthGuard } from '@common/guards/Jwt.guard';
import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
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
    return await this.service.create(data);
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
    if (id !== company_id)
      throw new ForbiddenException('Cannot update another company');

    return await this.service.update(id, data);
  }

  @LogAction(LogActions.GET_ONE_COMPANY)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Company> {
    return await this.service.findOneById(id);
  }

  @LogAction(LogActions.GET_COMPANIES)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(
    @Query() filters: FindAllCompaniesDTO,
  ): Promise<PaginatedResult<Company>> {
    return await this.service.findAll(filters);
  }
}
