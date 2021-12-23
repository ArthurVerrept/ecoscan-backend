import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import Product from 'src/products/entities/products.entity'
import { Repository } from 'typeorm'
import ReviewAggregate from './entities/reviewAggregate.entity'

@Injectable()
export class ReviewAggregateService {
    constructor(
        @InjectRepository(ReviewAggregate) private reviewAggregateRepository: Repository<ReviewAggregate>,
    ) {}

    async createOrUpdate(product: Product, sustainability: number, quality: number): Promise<ReviewAggregate> {
        let revAgg
        try {
            revAgg = await this.reviewAggregateRepository.findOne({ product })
            revAgg.sustainabilityScore = sustainability
            revAgg.qualityScore = quality
            revAgg.product = product
        } catch (error) {
            revAgg = await this.reviewAggregateRepository.create({
                sustainabilityScore: sustainability,
                qualityScore: quality,
                product: product
            })
        }
        
        return await this.reviewAggregateRepository.save(revAgg)
    }
}
