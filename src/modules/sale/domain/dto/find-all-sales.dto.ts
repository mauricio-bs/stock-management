import { IsEmpty, IsEnum, IsOptional } from 'class-validator';

import { PaginationDTO } from '@common/dto/Pagination.dto';
import { ESaleStatus } from '@common/enum/ESaleStatus';

export class FindAllSalesDTO extends PaginationDTO {
  @IsOptional()
  @IsEnum(ESaleStatus)
  status?: ESaleStatus;

  @IsEmpty()
  company_id: string;
}
