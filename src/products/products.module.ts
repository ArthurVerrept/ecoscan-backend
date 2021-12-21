import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { TypeOrmModule } from '@nestjs/typeorm'
import Products from './entities/products.entity'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'

@Module({
    imports: [TypeOrmModule.forFeature([Products]), HttpModule],
    controllers: [ProductsController],
    providers: [ProductsService],
    exports: [ProductsService]
  })
export class ProductsModule {
}
