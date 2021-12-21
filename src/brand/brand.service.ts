import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { getRepository, Like, Repository } from 'typeorm'
import Brand from './entities/brand.entity'

@Injectable()
export class BrandService {
    constructor(@InjectRepository(Brand) private brandRepository: Repository<Brand>){}
    
    async getBrandLike(name: string): Promise<Brand>{
        const brand = this.brandRepository.findOne({
            name: Like("%out #%")
        })
        return brand
    }
}
