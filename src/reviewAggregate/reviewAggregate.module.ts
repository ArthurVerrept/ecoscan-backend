import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import ReviewAggregate from './entities/reviewAggregate.entity'
import { ReviewAggregateService } from './reviewAggregate.service'

@Module({
    imports: [TypeOrmModule.forFeature([ReviewAggregate])],
    providers: [ReviewAggregateService],
    exports: [ReviewAggregateService]
})
export class ReviewAggregateModule {}
