import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductsService } from 'src/products/products.service'
import User from 'src/users/entities/user.entity'
import { Repository } from 'typeorm'
import Review from './entities/review.entity'

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Review) private reviewRepository: Repository<Review>,
        private readonly productRepository: ProductsService
    ){}
    
    async createReview(sustainability: number, quality: number, user: User, barcode: string): Promise<Review> {
        const newReview = await this.reviewRepository.create({ sustainability, quality })
        
        const product = await this.productRepository.getOneByBarcode(barcode)
        
        newReview.user = user
        newReview.product = product

        await this.reviewRepository.save(newReview)
        return
    }
}
