import { ClassSerializerInterceptor, Controller, Get, Param, ParseIntPipe, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import JwtAuthGuard from 'src/auth/jwt-auth.guard'
import Product from './entities/products.entity'
import { ProductsService } from './products.service'

@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) {
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(JwtAuthGuard)
    @Get(':barcode')
    async getProductByBarcode(@Param('barcode') barcode: string): Promise<Product | null> {
        // TODO: come back to Number(id) look at pipes documentation
        return await this.productService.getOneOrScrapeOne(barcode)
    }
}
