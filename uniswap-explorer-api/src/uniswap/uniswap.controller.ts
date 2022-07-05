import { Controller, Get, Logger, Param } from '@nestjs/common'
import { UniswapService } from './uniswap.service'

@Controller('uniswap')
export class UniswapController {
  private readonly logger = new Logger(UniswapService.name)

  constructor(private readonly uniswapService: UniswapService) {}

  @Get('block/:blockNumber/limit/:limit')
  async getUniswapTransactions(
    @Param('blockNumber') latestBlockNumber: number,
    @Param('limit') blockLimit: number,
  ) {
    const startTime = Date.now()

    const transactions = await this.uniswapService.getTransactions(
      Number(latestBlockNumber),
      Number(blockLimit),
    )

    const endTime = Date.now()
    this.logger.log(
      `Time: ${
        (endTime - startTime) / 1000
      }s. BlockLimit: ${blockLimit}. Transacions: ${transactions.length}`,
    )
    return transactions
  }
}
