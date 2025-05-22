import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/modules/auth/entities/user.entity';
import { OrderItem } from './order-item.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Order {
  @ApiProperty({ description: 'ID order' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Nama pelanggan' })
  @Column()
  customerName: string;

  @ApiProperty({
    description: 'Status order',
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending',
  })
  @Column({ default: 'pending' })
  status: 'pending' | 'completed' | 'cancelled';

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ApiProperty({ type: () => [OrderItem] })
  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];
}
