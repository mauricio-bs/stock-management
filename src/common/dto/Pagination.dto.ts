import { Transform } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationDTO {
  @Transform(({ value }) => value && Number(value))
  @IsOptional()
  @IsNumber()
  @IsInt()
  @IsPositive()
  page?: number = 1;

  @Transform(({ value }) => value && Number(value))
  @IsOptional()
  @IsNumber()
  @IsInt()
  @IsPositive()
  limit?: number = 10;
}
