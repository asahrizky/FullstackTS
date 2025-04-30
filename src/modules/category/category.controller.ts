import { Controller, Post, Body, Get } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { CategoryService } from './category.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  @ApiOperation({ summary: 'Add New Category' })
  @ApiResponse({
    status: 201,
    description: 'Category successfully Created',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 409,
    description: 'Category already exists',
  })
  @ApiBody({
    type: CategoryDto,
    examples: {
      example1: {
        value: {
          category: 'Example Category',
        },
        description: 'Example of Category creation payload',
      },
    },
  })
  async createCategory(@Body() categoryDto: CategoryDto) {
    return this.categoryService.createCategory(categoryDto);
  }

  @Get('Get')
  @ApiOperation({ summary: 'Get All Categories' })
  @ApiResponse({
    status: 200,
    description: 'List of all categories',
  })
  async getAllCategories() {
    return this.categoryService.getAllCategories();
  }
}
