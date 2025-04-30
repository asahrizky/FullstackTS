import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';

@ApiTags('Product')
@Controller('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @ApiOperation({ summary: 'Add New Product' })
  @ApiResponse({
    status: 201,
    description: 'Product Successfully Created',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found',
  })
  @ApiResponse({
    status: 409,
    description: 'Product already Exists',
  })
  @ApiBody({
    type: ProductDto,
    examples: {
      example1: {
        value: {
          productName: 'Daster',
          description: 'Baju daster',
          categoryId: 2,
          sizes: [
            {
              size: 'S',
              price: 100000,
              stock: 10,
            },
            {
              size: 'M',
              price: 100000,
              stock: 15,
            },
            {
              size: 'L',
              price: 100000,
              stock: 20,
            },
          ],
        },
        description: 'Example of Product creation payload',
      },
    },
  })
  async createProduct(@Body() productDto: ProductDto) {
    return this.productService.createProduct(productDto);
  }

  @Get('Get')
  @ApiOperation({ summary: 'Get All Products' })
  @ApiResponse({
    status: 200,
    description: 'List Of all product',
  })
  async getAllProduct() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Product by ID' })
  @ApiParam({
    name: 'id',
    description: 'Product ID',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Product details with sizes and total stock',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  async getProductById(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getProductById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Product by ID' })
  @ApiParam({
    name: 'id',
    description: 'Product ID',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Product successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteProduct(id);
  }
}
