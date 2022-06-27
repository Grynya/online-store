import {
  Controller,
  Delete,
  Get,
  Post,
  Param,
  Body, Put,
} from '@nestjs/common';
import { Product } from '../models/Product';
import { ProductService } from '../service/product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  /**
   * An endpoint to get all products
   */
  @Get()
  getAll(): Promise<Product[]> {
    return this.productService.getAll();
  }
  /**
   * An endpoint to get all products sorted by name
   */
  @Get("/name-sorted")
  getAllSortedByName(): Promise<Product[]> {
    return this.productService.getAllSortedByName();
  }
  /**
   * An endpoint to get all products sorted by price
   */
  @Get("/price-sorted")
  getAllSortedByPrice(): Promise<Product[]> {
    return this.productService.getAllSortedByPrice();
  }
  /**
   * An endpoint to get add new product
   */
  @Post()
  add(@Body() product: Product): Promise<void> {
    return this.productService.add(product);
  }
  /**
   * An endpoint to update product
   */
  @Put(':id')
  put(@Param('id') id: string, newProduct: Product): Promise<void> {
    return this.productService.update(id, newProduct);
  }
  /**
   * An endpoint to delete product
   */
  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.productService.delete(id);
  }
}
