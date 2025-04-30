import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createCategory(categoryDto: CategoryDto): Promise<Category> {
    const existingCategory = await this.categoryRepository.findOne({
      where: { categoryName: categoryDto.category },
    });

    if (existingCategory) {
      throw new ConflictException('Category already exists');
    }

    const category = this.categoryRepository.create({
      categoryName: categoryDto.category,
    });
    return this.categoryRepository.save(category);
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }
}
