import { PartialType } from '@nestjs/mapped-types';

import { CreateSaleDTO } from './create-sale.dto';

export class UpdateSaleDTO extends PartialType(CreateSaleDTO) {}
