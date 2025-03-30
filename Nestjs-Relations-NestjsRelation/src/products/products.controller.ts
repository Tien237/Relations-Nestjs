import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';

interface ProductParams {
  name: string;
  description: string;
  image: string;
  price: number;
}

interface UpdateProductParams extends Partial<ProductParams> {
  quantity?: number;
}

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  async getAll() {
    return { message: 'hello', data: await this.productService.getAll() };
  }

  @Get(':id')
  async getDetail(@Param('id') id: number) {
    return { message: 'Data', data: await this.productService.getDetail(id) };
  }

  @Post('create')
  async create(@Body() body: ProductParams) {
    return { message: 'Created successfully', data: await this.productService.createProduct(body) };
  }

  @Put('update/:id')
  async update(@Param('id') id: number, @Body() body: UpdateProductParams) {
    return { message: 'Updated successfully', data: await this.productService.updateProduct(id, body) };
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: number) {
    await this.productService.deleteProduct(id);
    return { message: 'Deleted successfully' };
  }
}
