import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import Product from './entities/products.entity'
import { CreateProductDto } from './dto/CreateProduct.dto'

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private productRepository: Repository<Product>){

    }

    getAll(): Promise<Product[]> {
        return this.productRepository.find() // SELECT * from product
    }

    async getOneByBarcode(barcode: number): Promise<Product> {
        return await this.productRepository.findOne({ barcode }) // SELECT * from product WHERE id = ?
    }

    async create(product: CreateProductDto): Promise<Product> {
        return await this.productRepository.create(product) // SELECT * from product WHERE id = ?
    }
}
