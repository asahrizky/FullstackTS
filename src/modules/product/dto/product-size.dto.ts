import { ApiProperty } from '@nestjs/swagger';

export class ProductSizeDto {
  @ApiProperty({
    example: 'S',
    description: 'Size of the product',
    required: true,
  })
  size: string;

  @ApiProperty({
    example: 100000,
    description: 'Price of the product',
    required: true,
  })
  price: number;

  @ApiProperty({
    example: 10,
    description: 'Stock of the product',
    required: true,
  })
  stock: number;
}
