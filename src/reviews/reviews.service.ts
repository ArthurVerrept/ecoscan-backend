import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import User from 'src/users/entities/user.entity'
import { Repository } from 'typeorm'
import { CreateReviewDto } from './dto/createReview.dto'
import Review from './entities/reviews.entity'

@Injectable()
export class ReviewsService {
    constructor(@InjectRepository(Review) private reviewRepository: Repository<Review>){
    }
    
    async createReview(addReviewDto: CreateReviewDto, user: User): Promise<Review> {
        const newReview = await this.reviewRepository.create({ ...addReviewDto })
        newReview.user = user
        return this.reviewRepository.save(newReview)
    }
}
