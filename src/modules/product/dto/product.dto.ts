import { ApiProperty } from '@nestjs/swagger';
import { ProductSizeDto } from './product-size.dto';

export class ProductDto {
  @ApiProperty({
    example: 'Example Product',
    description: 'Name of the product',
    required: true,
  })
  productName: string;

  @ApiProperty({
    example: 'This is a sample product description',
    description: 'Description of the product',
    required: true,
  })
  description: string;

  @ApiProperty({
    example: 1,
    description: 'ID of the category',
    required: true,
  })
  categoryId: number;

  @ApiProperty({
    type: [ProductSizeDto],
    description: 'Sizes of the product',
    required: true,
  })
  sizes: ProductSizeDto[];
}
