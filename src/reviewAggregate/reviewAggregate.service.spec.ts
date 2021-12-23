import { Test, TestingModule } from '@nestjs/testing'
import { ReviewAggregateService } from './reviewAggregate.service'

describe('ReviewAggregateService', () => {
  let service: ReviewAggregateService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewAggregateService]
    }).compile()

    service = module.get<ReviewAggregateService>(ReviewAggregateService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
