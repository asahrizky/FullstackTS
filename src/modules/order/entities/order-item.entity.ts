import { ProductSize } from 'src/modules/product/entities/product-size.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class OrderItem {
  @ApiProperty({ description: 'ID order item' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Jumlah item' })
  @Column()
  quantity: number;

  @ApiProperty({ type: () => Order })
  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  @ApiProperty({ type: () => ProductSize })
  @ManyToOne(() => ProductSize)
  productSize: ProductSize;
}
