import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../models/Product';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async add(product: Product): Promise<void> {
    await this.productRepository.save(product);
  }

  async getAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async buy(id: string): Promise<void> {
    await this.productRepository.update(id, { isBought: true });
  }

  async delete(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}
