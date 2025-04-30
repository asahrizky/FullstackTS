import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty({
    example: 'Dewasa',
    description: 'Categories',
    required: true,
  })
  category: string;
}
