import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { AxiosResponse } from 'axios'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import Product from './entities/products.entity'
import { CreateProductDto } from './dto/CreateProduct.dto'
import { Observable } from 'rxjs/internal/Observable'
import { ScrapedProductDto } from './dto/scrapedProduct.dto'

@Injectable()
export class ProductsService {
    constructor(
        private httpService: HttpService,
        @InjectRepository(Product) private productRepository: Repository<Product>
    ){}

    getAll(): Promise<Product[]> {
        return this.productRepository.find() // SELECT * from product
    }

    async getOneByBarcode(barcode: number): Promise<Product  | undefined>{
        try{
            return await this.productRepository.findOneOrFail({ barcode }) // SELECT * from product WHERE id = ?
        } catch {
            const product = await this.httpService.get('http://localhost:8000/?barcode=' + barcode)
            console.log(product.forEach((aaa) => {console.log(aaa)}))
            
            // if (product) {
            //     const newProduct = {
            //         productName: product.data.
            //     }
            //     this.create(product)
            // }

            // call scraper
            // save product in db if found
            // return saved product
        }
    }

    async create(product: CreateProductDto): Promise<Product> {
        return await this.productRepository.create(product) // SELECT * from product WHERE id = ?
    }
}
