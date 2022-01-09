import { ClassSerializerInterceptor, Controller, Get, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import JwtAuthGuard from '../auth/jwt-auth.guard'
import ReviewAggregate from 'src/reviewAggregate/entities/reviewAggregate.entity'
import Product from './entities/products.entity'
import { ProductsService } from './products.service'

@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) {
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(JwtAuthGuard)
    @Get()
    async getProductByBarcode(@Req() req, @Query('barcode') barcode: string): Promise<Product | null> {
        return await this.productService.getOneOrScrapeOne(barcode, req.user.id)
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(JwtAuthGuard)
    @Get('most-popular')
    async getMostPopular(): Promise<Product[]>   {
        return await this.productService.getMostPopularItems()
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(JwtAuthGuard)
    @Get('best-quality')
    async getHighestQuality(): Promise<ReviewAggregate[]> {
        return await this.productService.getBestQualtyItems()
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(JwtAuthGuard)
    @Get('most-sustainable')
    async getMostSustainable(): Promise<ReviewAggregate[]> {
        return await this.productService.getMostSustainable()
    }
}
