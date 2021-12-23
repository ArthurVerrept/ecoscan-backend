import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import Review from './entities/review.entity'
import { ReviewsService } from './reviews.service'
import { ReviewsController } from './reviews.controller'
import { ProductsModule } from 'src/products/products.module'
import { ReviewAggregateModule } from 'src/reviewAggregate/reviewAggregate.module'

@Module({
  imports: [TypeOrmModule.forFeature([Review]), ProductsModule, ReviewAggregateModule],
  providers: [ReviewsService],
  controllers: [ReviewsController],
  exports: [ReviewsService]
})
export class ReviewsModule {}
