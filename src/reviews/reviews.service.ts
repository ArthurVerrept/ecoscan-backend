import { HttpException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import Product from 'src/products/entities/products.entity'
import { ProductsService } from 'src/products/products.service'
import { ReviewAggregateService } from 'src/reviewAggregate/reviewAggregate.service'
import User from 'src/users/entities/user.entity'
import { Repository } from 'typeorm'
import Review from './entities/review.entity'

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Review) private reviewRepository: Repository<Review>,
        private readonly productRepository: ProductsService,
        private readonly reviewAggregateService: ReviewAggregateService
    ){}

    async getAverages(product: Product) {
        // return await this.reviewRepository.find({ product })
        const sustainability = await this.reviewRepository
            .createQueryBuilder("review")
            .select("AVG(review.sustainability)", "avg")
            .where("review.product_id = :id", { id: product.id })
            .getRawOne()

        const quality = await this.reviewRepository
            .createQueryBuilder("review")
            .select("AVG(review.quality)", "avg")
            .where("review.product_id = :id", { id: product.id })
            .getRawOne()
            
        const sustainabilityAverage = Math.round(sustainability.avg * 10) / 10
        const qualityAverage = Math.round(quality.avg * 10) / 10
        // await getRepository(Review)
        // .createQueryBuilder("review")
        // .select("SUM(review.sustainability)", "sum")
        // .getRawOne()
        return { sustainability: sustainabilityAverage, quality: qualityAverage }
    }
    
    // TODO: if you have time make this a sql transaction
    async createReview(sustainability: number, quality: number, user: User, barcode: string): Promise<Review> {
        if(sustainability > 5 || quality > 5 || sustainability < 0 || quality < 0) {
            throw new HttpException('sustainability and quality values should be between 0 and 5', 400)
        }
        if(sustainability % 1 !== 0 || quality % 1 !== 0) {
            throw new HttpException('sustainability and quality values should be a whole number', 400)
        }
        let newReview = await this.reviewRepository.create({ sustainability, quality })
        
        const product = await this.productRepository.getOneByBarcode(barcode)
        
        newReview.product = product

        const newProduct = await this.productRepository.incrementReviews(product)

        newReview.user = user
        
        newReview =  await this.reviewRepository.save(newReview)

        // for now since we don't have many reviewers
        // we can aggregate on every review, this
        // could be changed in the future
        if(parseInt(newProduct.scanAmount) % 1 === 0) {
            const averages = await this.getAverages(newProduct)
            await this.reviewAggregateService.createOrUpdate(newProduct, averages.sustainability, averages.quality)
        }

        return newReview
    }
}
