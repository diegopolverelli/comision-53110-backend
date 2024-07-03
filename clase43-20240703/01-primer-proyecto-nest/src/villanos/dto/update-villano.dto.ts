import { PartialType } from '@nestjs/mapped-types';
import { CreateVillanoDto } from './create-villano.dto';

export class UpdateVillanoDto extends PartialType(CreateVillanoDto) {}
