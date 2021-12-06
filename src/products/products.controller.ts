import { Controller, Get, Param } from '@nestjs/common'
import Product from './entities/products.entity'
import { ProductsService } from './products.service'

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) {
    }

    @Get()
    async getProducts(): Promise<Product[]> {
        return await this.productService.getAll()
    }

    @Get(':id')
    async getProductById(@Param('id') id: string): Promise<Product> {
        // TODO: come back to Number(id) look at pipes documentation
        return await this.productService.getOneById(Number(id))
    }
}
