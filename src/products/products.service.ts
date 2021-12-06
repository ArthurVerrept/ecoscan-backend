import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import Product from './entities/products.entity'

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private productRepository: Repository<Product>){

    }

    getAll(): Promise<Product[]> {
        return this.productRepository.find() // SELECT * from product
    }

    async getOneById(id: number): Promise<Product> {
        return await this.productRepository.findOneOrFail(id) // SELECT * from product WHERE id = ?
    }
}
