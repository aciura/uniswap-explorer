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
    console.time('getTransactions')

    const transactions = await this.uniswapService.getTransactions(
      Number(blockNumber),
      Number(limit),
    )

    console.timeEnd('getTransactions')
    console.log(`Limit: ${limit}.`)
    return transactions
  }
}
