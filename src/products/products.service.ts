import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { AxiosResponse } from 'axios'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import Product from './entities/products.entity'
import { CreateProductDto } from './dto/CreateProduct.dto'
import { ScrapedProductDto } from './dto/scrapedProduct.dto'
import { lastValueFrom } from 'rxjs'
import { BrandService } from 'src/brand/brand.service'

@Injectable()
export class ProductsService {
    constructor(
        private httpService: HttpService,
        private brandService: BrandService,
        @InjectRepository(Product) private productRepository: Repository<Product>
    ){}

    async getById(id: number): Promise<Product> {
        return await this.productRepository.findOne({ id }) // SELECT * from product
    }

    async getOneOrScrapeOne(barcode: string) {
        try{
            return await this.productRepository.findOneOrFail({ where: { barcode }, relations: ['brand'] }) // SELECT * from product WHERE id = ?
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
                    img: product.data.img,
                    barcode
                }
                return await this.create(newProduct, product.data.brand.toUpperCase())
            }
        }
    }

    async create(product: CreateProductDto, brandName: string): Promise<Product> {
        const newProduct = await this.productRepository.create(product) // SELECT * from product WHERE id = ?

        const brand = await this.brandService.getBrandLike(brandName)

        // if there is a brand assign it now
        if (brand) {
            newProduct.brand = brand
        } 
        // if not add the product, and ask user for brand later.

        return await this.productRepository.save(newProduct)
    }
}
