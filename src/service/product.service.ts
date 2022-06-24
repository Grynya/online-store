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

  async getAllSortedByName(): Promise<Product[]> {
    let products = await this.productRepository.find();
    return products.sort(compareByName);
  }

  async getAllSortedByPrice(): Promise<Product[]> {
    let products = await this.productRepository.find();
    return products.sort(compareByPrice);
  }

  async buy(id: string): Promise<void> {
    await this.productRepository.update(id, { isBought: true });
  }

  async delete(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}
function compareByName( a: Product, b: Product) {
  if ( a.name < b.name ){
    return -1;
  }
  if ( a.name > b.name ){
    return 1;
  }
  return 0;
}
function compareByPrice( a: Product, b: Product) {
  if ( a.price < b.price ){
    return -1;
  }
  if ( a.price > b.price ){
    return 1;
  }
  return 0;
}
