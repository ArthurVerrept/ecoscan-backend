import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import Review from './entities/reviews.entity'
import { ReviewsService } from './reviews.service'
import { ReviewsController } from './reviews.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  providers: [ReviewsService],
  controllers: [ReviewsController]
})
export class ReviewsModule {}
