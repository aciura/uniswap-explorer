import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  @Get()
  serviceStatus(): string {
    const timestamp = Date.now()
    return `${new Date(timestamp)}: Service up`
  }
}
