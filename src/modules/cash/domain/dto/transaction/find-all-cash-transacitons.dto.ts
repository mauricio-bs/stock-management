import { IsDate, IsOptional, IsUUID } from 'class-validator';

import { PaginationDTO } from '@common/dto/Pagination.dto';

export class FindAllCashTransactionsDTO extends PaginationDTO {
  @IsOptional()
  @IsDate()
  start_date?: Date;

  @IsOptional()
  @IsDate()
  end_date?: Date;

  @IsOptional()
  @IsUUID(4)
  sale_id?: string;

  @IsOptional()
  @IsUUID(4)
  user_id?: string;
}
