import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { UniswapModule } from './uniswap/uniswap.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    UniswapModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
