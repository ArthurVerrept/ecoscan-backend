import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import ReviewAggregates from './entities/reviewAggregate.entity'

@Module({
    imports: [TypeOrmModule.forFeature([ReviewAggregates])]
})
export class ReviewAggregateModule {}
