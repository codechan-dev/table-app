import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  unit: string;

  @IsNotEmpty()
  @IsNumber()
  manufacturerId: number; // ID of the Manufacturer

  @IsNumber()
  brandId?: number; // ID of the Brand (optional)

  @IsNumber()
  categoryId?: number; // ID of the Category (optional)
}
