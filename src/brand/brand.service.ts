import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import Product from 'src/products/entities/products.entity'
import { Repository } from 'typeorm'
import Brand from './entities/brand.entity'

@Injectable()
export class BrandService {
    constructor(@InjectRepository(Brand) private brandRepository: Repository<Brand>){}
    
    async getBrandLike(name: string): Promise<Brand>{
        const brand = await this.brandRepository.findOne({ name })
        console.log(brand)
        console.log(name)
        return brand
    }

    async create(name: string, product: Product[]){
        const brand = await this.brandRepository.create({ name, product, sustainabilityScore: NaN, qualityScore: NaN, description: ''  })


        return await this.brandRepository.save(brand)
    }
}
