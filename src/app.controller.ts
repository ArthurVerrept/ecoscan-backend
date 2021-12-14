import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('seed')
  async seed(): Promise<string> {
    return await this.appService.seed()
  }

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }
}
