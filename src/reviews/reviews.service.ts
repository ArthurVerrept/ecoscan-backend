import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import Product from 'src/products/entities/products.entity'
import User from 'src/users/entities/user.entity'
import { Repository } from 'typeorm'
import Review from './entities/review.entity'

@Injectable()
export class ReviewsService {
    constructor(@InjectRepository(Review) private reviewRepository: Repository<Review>){
    }
    
    async createReview(sustainability: number, quality: number, user: User, product: Product): Promise<Review> {
        const newReview = await this.reviewRepository.create({ sustainability, quality })
        
        newReview.user = user
        newReview.product = product
        await this.reviewRepository.save(newReview)
        return
    }
}
