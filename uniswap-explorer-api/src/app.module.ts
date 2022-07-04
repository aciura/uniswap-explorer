import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { UniswapModule } from './uniswap/uniswap.module'
import { ConfigModule } from 'nestjs-dotenv'

@Module({
  imports: [UniswapModule, ConfigModule.forRoot()],
  controllers: [AppController],
})
export class AppModule {}
