import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductDto } from './dto/product.dto';
import { Category } from '../../modules/category/entities/category.entity';
import { ProductSize } from './entities/product-size.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(ProductSize)
    private productSizeRepository: Repository<ProductSize>,
  ) {}

  async createProduct(productDto: ProductDto): Promise<Product> {
    const existingProduct = await this.productRepository.findOne({
      where: { productName: productDto.productName },
    });

    if (existingProduct) {
      throw new ConflictException('Product already exists');
    }

    const category = await this.categoryRepository.findOne({
      where: { id: productDto.categoryId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const product = this.productRepository.create({
      productName: productDto.productName,
      description: productDto.description,
      category: category,
    });

    const savedProduct = await this.productRepository.save(product);

    if (productDto.sizes && productDto.sizes.length > 0) {
      const productSizes = productDto.sizes.map((sizeDto) => {
        const productSize = this.productSizeRepository.create({
          size: sizeDto.size,
          price: sizeDto.price,
          stock: sizeDto.stock,
          product: savedProduct,
        });
        return productSize;
      });

      await this.productSizeRepository.save(productSizes);
    }

    const productWithRelations = await this.productRepository.findOne({
      where: { id: savedProduct.id },
      relations: ['category', 'sizes'],
    });

    if (!productWithRelations) {
      throw new NotFoundException('Product not found after creation');
    }

    return productWithRelations;
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['category', 'sizes'],
    });
  }

  async getProductById(id: number): Promise<any> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category', 'sizes'],
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    const totalStock = product.sizes.reduce((sum, size) => sum + size.stock, 0);

    return {
      id: product.id,
      productName: product.productName,
      description: product.description,
      category: {
        id: product.category.id,
        categoryName: product.category.categoryName,
      },
      sizes: product.sizes.map((size) => ({
        size: size.size,
        price: size.price,
        stock: size.stock,
      })),
      totalStock,
    };
  }

  async deleteProduct(id: number): Promise<{ message: string }> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['sizes'],
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    if (product.sizes && product.sizes.length > 0) {
      await this.productSizeRepository.remove(product.sizes);
    }

    await this.productRepository.remove(product);

    return { message: `Product with ID ${id} has been successfully deleted` };
  }
}
