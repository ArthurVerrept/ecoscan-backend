import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import Brand from './entities/brand.entity'

@Injectable()
export class BrandService {
    constructor(@InjectRepository(Brand) private brandRepository: Repository<Brand>){}
    
    async getBrandLike(name: string): Promise<Brand>{
        const brand = await this.brandRepository.findOne({ name })

        return brand
    }
}
