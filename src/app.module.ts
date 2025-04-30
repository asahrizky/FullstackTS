import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { sqliteConfig } from './database/sqlite.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(sqliteConfig),
    AuthModule,
    ProductModule,
    CategoryModule,
  ],
})
export class AppModule {}
