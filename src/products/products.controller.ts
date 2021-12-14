import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import JwtAuthGuard from 'src/auth/jwt-auth.guard'
import Product from './entities/products.entity'
import { ProductsService } from './products.service'

@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getProducts(): Promise<Product[]> {
        return await this.productService.getAll()
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getProductByBarcode(@Param('id') barcode: string): Promise<Product> {
        // TODO: come back to Number(id) look at pipes documentation
        return await this.productService.getOneByBarcode(Number(barcode))
    }
}
