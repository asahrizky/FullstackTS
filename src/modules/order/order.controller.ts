import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { Order } from './entities/order.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../auth/decorators/public.decorator';
import { User } from '../auth/entities/user.entity';

@ApiTags('orders')
@Controller('orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({
    status: 201,
    description: 'Order has been successfully created.',
    type: Order,
  })
  async create(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    // Untuk testing, kita buat user dummy
    const dummyUser = {
      id: 1,
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      password: 'dummy',
      isActive: true,
      userRoles: [],
      orders: [],
      hashPassword: async () => {},
      comparePassword: async () => true,
    } as User;

    return this.orderService.create(createOrderDto, dummyUser);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all orders for the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'Return all orders.',
    type: [Order],
  })
  async findAll(@Request() req) {
    // Untuk testing, kita buat user dummy
    const dummyUser = {
      id: 1,
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      password: 'dummy',
      isActive: true,
      userRoles: [],
      orders: [],
      hashPassword: async () => {},
      comparePassword: async () => true,
    } as User;

    return this.orderService.findAll(dummyUser);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a specific order by ID' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the order.',
    type: Order,
  })
  @ApiResponse({
    status: 404,
    description: 'Order not found.',
  })
  async findOne(@Param('id') id: string, @Request() req) {
    // Untuk testing, kita buat user dummy
    const dummyUser = {
      id: 1,
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      password: 'dummy',
      isActive: true,
      userRoles: [],
      orders: [],
      hashPassword: async () => {},
      comparePassword: async () => true,
    } as User;

    return this.orderService.findOne(+id, dummyUser);
  }

  @Public()
  @Patch(':id/status')
  @ApiOperation({ summary: 'Update order status' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({
    status: 200,
    description: 'Order status has been successfully updated.',
    type: Order,
  })
  @ApiResponse({
    status: 404,
    description: 'Order not found.',
  })
  async updateStatus(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
    @Request() req,
  ) {
    // Untuk testing, kita buat user dummy
    const dummyUser = {
      id: 1,
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      password: 'dummy',
      isActive: true,
      userRoles: [],
      orders: [],
      hashPassword: async () => {},
      comparePassword: async () => true,
    } as User;

    return this.orderService.updateStatus(+id, updateOrderStatusDto, dummyUser);
  }
}
