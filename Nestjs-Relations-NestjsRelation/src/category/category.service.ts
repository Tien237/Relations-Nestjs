import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  getAll(): Promise<Category[]> {
    return this.categoryRepository.find({ relations: ['products'] });
  }

  getOne(id: number): Promise<Category | null> {
    return this.categoryRepository.findOne({ where: { id }, relations: ['products'] });
  }
}
