import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('getAll')
  async getAll() {
    return { message: 'okieeee', data: await this.categoryService.getAll() };
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return { message: 'okieeee', data: (await this.categoryService.getOne(id))?.products };
  }
}
