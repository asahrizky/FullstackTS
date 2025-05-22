import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { ProductSize } from '../product/entities/product-size.entity';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(ProductSize)
    private productSizeRepository: Repository<ProductSize>,
  ) {}

  async create(createOrderDto: CreateOrderDto, user: User): Promise<Order> {
    const order = this.orderRepository.create({
      customerName: createOrderDto.customerName,
      user,
    });

    const savedOrder = await this.orderRepository.save(order);

    const orderItems = await Promise.all(
      createOrderDto.items.map(async (item) => {
        const productSize = await this.productSizeRepository.findOne({
          where: { id: item.productSizeId },
        });

        if (!productSize) {
          throw new NotFoundException(
            `ProductSize with ID ${item.productSizeId} not found`,
          );
        }

        const orderItem = this.orderItemRepository.create({
          order: savedOrder,
          productSize,
          quantity: item.quantity,
        });

        return this.orderItemRepository.save(orderItem);
      }),
    );

    savedOrder.items = orderItems;
    return savedOrder;
  }

  async findAll(user: User): Promise<Order[]> {
    return this.orderRepository.find({
      where: { user: { id: user.id } },
      relations: ['items', 'items.productSize'],
    });
  }

  async findOne(id: number, user: User): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id, user: { id: user.id } },
      relations: ['items', 'items.productSize'],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async updateStatus(
    id: number,
    updateOrderStatusDto: UpdateOrderStatusDto,
    user: User,
  ): Promise<Order> {
    const order = await this.findOne(id, user);
    order.status = updateOrderStatusDto.status;
    return this.orderRepository.save(order);
  }
}
