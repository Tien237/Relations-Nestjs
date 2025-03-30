import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductParams, UpdateProductParams } from './products.controller';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  getAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  getDetail(id: number): Promise<Product> {
    return this.productRepository.findOneBy({ id });
  }

  async createProduct(params: ProductParams): Promise<Product> {
    const productNew = this.productRepository.create({
      name: params.name,
      image: params.image,
      description: params.description,
      quantity: 124,  // Set a default quantity
      price: params.price,
      status: true,   // Default status is true
    });
    return this.productRepository.save(productNew);
  }

  async updateProduct(id: number, params: UpdateProductParams): Promise<Product> {
    const product = await this.productRepository.preload({
      id,
      name: params.newName,
      image: params.newImage,
      description: params.newDescription,
      quantity: params.newQuantity,
      price: params.newPrice,
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    
    return this.productRepository.save(product);
  }

  deleteProduct(id: number): Promise<void> {
    return this.productRepository.delete(id).then(() => undefined);
  }
}
