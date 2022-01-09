import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { HttpModule } from '@nestjs/axios'
import { ProductsService } from './products.service'
import { BrandModule } from 'src/brand/brand.module'
import { UsersModule } from 'src/users/users.module'
import { ReviewAggregateModule } from 'src/reviewAggregate/reviewAggregate.module'

describe('ProductsService', () => {
  let service: ProductsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService]
    }).compile()

    service = module.get<ProductsService>(ProductsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
