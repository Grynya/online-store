import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { Product } from '../models/Product';
import { ProductService } from '../service/product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAll(): Promise<Product[]> {
    return this.productService.getAll();
  }
  @Get("/name-sorted")
  getAllSortedByName(): Promise<Product[]> {
    return this.productService.getAllSortedByName();
  }
  @Get("/price-sorted")
  getAllSortedByPrice(): Promise<Product[]> {
    return this.productService.getAllSortedByPrice();
  }
  @Post()
  add(@Body() product: Product): Promise<void> {
    return this.productService.add(product);
  }
  @Put(':id')
  buy(@Param('id') id: string): Promise<void> {
    return this.productService.buy(id);
  }
  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.productService.delete(id);
  }
}
