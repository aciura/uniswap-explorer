import {
  CacheInterceptor,
  Controller,
  Get,
  Logger,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common'
import { UniswapService } from './uniswap.service'

@Controller('uniswap')
@UseInterceptors(CacheInterceptor)
export class UniswapController {
  private readonly logger = new Logger(UniswapService.name)

  constructor(private readonly uniswapService: UniswapService) {}

  @Get('block/:blockNumber')
  async getUniswapTransactions(
    @Param('blockNumber') latestBlockNumber: number,
    @Query('limit') blockLimit?: number,
  ) {
    const startTime = Date.now()

    const transactions = await this.uniswapService.getTransactions(
      Number(latestBlockNumber),
      Number(blockLimit ?? 1),
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
