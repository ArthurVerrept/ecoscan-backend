import { Injectable } from '@nestjs/common'
import { ProductsService } from './products/products.service'
import { ReviewsService } from './reviews/reviews.service'
import { UsersService } from './users/users.service'

@Injectable()
export class AppService {
  constructor(
    private readonly usersService: UsersService,
    private readonly reviewsService: ReviewsService,
    private readonly productsService: ProductsService
    ){}

  getHello(): string {
    return 'Hello World!'
  }

  async seed(): Promise<string> {
    const user = await this.usersService.createWithGoogle('arthur verrept', 'arthur-verrept@hotmail.co.uk')
    const product = await this.productsService.create({
      productName: 'Walkers Prawn Cocktail',
      img: 'https://www.britishcornershop.co.uk/img/large/SGN1375.jpg',
      barcode: 5000328452579
  })
    await this.reviewsService.createReview(3, 0, user, product)
    return 'complete'
  }
}
