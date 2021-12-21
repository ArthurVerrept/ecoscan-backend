import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { AxiosResponse } from 'axios'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import Product from './entities/products.entity'
import { CreateProductDto } from './dto/CreateProduct.dto'
import { ScrapedProductDto } from './dto/scrapedProduct.dto'
import { lastValueFrom } from 'rxjs'

@Injectable()
export class ProductsService {
    constructor(
        private httpService: HttpService,
        @InjectRepository(Product) private productRepository: Repository<Product>
    ){}

    getAll(): Promise<Product[]> {
        return this.productRepository.find() // SELECT * from product
    }

    // : Promise<Product  | undefined>
    async getOneByBarcode(barcode: string) {
        try{
            return await this.productRepository.findOneOrFail({ barcode }) // SELECT * from product WHERE id = ?
        } catch {
            // for the record I hate reading this as much as the next guy
            // https://indepth.dev/posts/1287/rxjs-heads-up-topromise-is-being-deprecated
            // there used to be a clean .toPromise() but that was too nice and easy so they
            // killed it off (not actually i just don't have time to research another thing) 
            const product$ = await this.httpService.get('http://localhost:8000/?barcode=' + barcode)
            const product: AxiosResponse<ScrapedProductDto | undefined> = await lastValueFrom(product$)

            if (product.data) {
                const newProduct = {
                    src: product.data.src,
                    productName: product.data.name,
                    img: product.data.name,
                    barcode
                }
                return await this.create(newProduct)
            }
            

            // call scraper
            // save product in db if found
            // return saved product
        }
    }

    async create(product: CreateProductDto): Promise<Product> {
        const newPorduct = await this.productRepository.create(product) // SELECT * from product WHERE id = ?

        return await this.productRepository.save(newPorduct)
    }
}
