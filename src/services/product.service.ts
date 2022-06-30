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

   add(product: Product): Promise<Product> {
    return this.productRepository.save(product);
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

   delete(id: string): Promise<any> {
    return  this.productRepository.delete(id);
  }

   update(id: string, newProduct): Promise<any> {
    return this.productRepository.update(id, newProduct);
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
