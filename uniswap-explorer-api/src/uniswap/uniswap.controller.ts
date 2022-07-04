import { Controller, Get, Param } from '@nestjs/common'
import { UniswapService } from './uniswap.service'

@Controller('uniswap')
export class UniswapController {
  constructor(private readonly uniswapService: UniswapService) {}

  @Get('block/:blockNumber/limit/:limit')
  async getUniswapTransactions(
    @Param('blockNumber') blockNumber: number,
    @Param('limit') limit: number,
  ) {
    const transactions = await this.uniswapService.getTransactions(
      blockNumber,
      limit,
    )
    return transactions
  }
}
