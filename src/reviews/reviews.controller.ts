import { Body, Controller, Post, UseGuards, Request, HttpCode } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import JwtAuthGuard from 'src/auth/jwt-auth.guard'
import { CreateReviewDto } from './dto/createReview.dto'
import Review from './entities/reviews.entity'
import { ReviewsService } from './reviews.service'

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService){}

    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @Post()
    async createReview(@Body() body: CreateReviewDto, @Request() req): Promise<Review> {
        return await this.reviewsService.createReview(body, req.user.id)
    }
}
