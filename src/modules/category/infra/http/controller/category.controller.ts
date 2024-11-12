import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Put,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';

import { LogAction } from '@common/decorator/log-actions.decorator';
import { UserInfo } from '@common/decorator/user.decorator';
import { LogActions } from '@common/enum/LogActions';
import { JwtAuthGuard } from '@common/guards/Jwt.guard';
import { PaginatedResult } from '@common/interfaces/pagination/PaginatedResult';
import { Category } from '@entities/Category';
import { CreateCategoryDTO } from '@modules/category/domain/dto/create-category.dto';
import { FindAllCategoriesDTO } from '@modules/category/domain/dto/find-all-categories.dto';
import { UpdateCategoryDTO } from '@modules/category/domain/dto/update-category.dto';
import { ICategoryService } from '@modules/category/domain/service/ICategory.service';

@UseGuards(JwtAuthGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly service: ICategoryService) {}

  @LogAction(LogActions.CREATE_CATEGORY)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @UserInfo('company_id') company_id: string,
    @Body() data: CreateCategoryDTO,
  ): Promise<Category> {
    return await this.service.create({ ...data, company_id });
  }

  @LogAction(LogActions.UPDATE_CATEGORY)
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async update(
    @UserInfo('company_id') company_id: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateCategoryDTO,
  ): Promise<Category> {
    return await this.service.update(id, { ...data, company_id });
  }

  @LogAction(LogActions.DELETE_CATEGORY)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(
    @UserInfo('company_id') company_id: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    return await this.service.delete(id, company_id);
  }

  @LogAction(LogActions.GET_ONE_CATEGORY)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(
    @UserInfo('company_id') company_id: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Category> {
    return await this.service.findOneById(id, company_id);
  }

  @LogAction(LogActions.GET_CATEGORIES)
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(
    @UserInfo('company_id') company_id: string,
    @Query() filters: FindAllCategoriesDTO,
  ): Promise<PaginatedResult<Category>> {
    return await this.service.findAll({ ...filters, company_id });
  }
}
