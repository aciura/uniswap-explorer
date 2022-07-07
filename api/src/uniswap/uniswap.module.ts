import { CacheModule, Module } from '@nestjs/common'
import { UniswapController } from './uniswap.controller'
import { UniswapService } from './uniswap.service'

@Module({
  imports: [CacheModule.register({ ttl: 60 * 5 /*5mins*/ })],
  controllers: [UniswapController],
  providers: [UniswapService],
})
export class UniswapModule {}
