import { Test, TestingModule } from '@nestjs/testing'
import { UniswapController } from './uniswap.controller'

describe('UniswapController', () => {
  let controller: UniswapController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UniswapController],
    }).compile()

    controller = module.get<UniswapController>(UniswapController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
