import { Test, TestingModule } from '@nestjs/testing';
import { UniswapService } from './uniswap.service';

describe('UniswapService', () => {
  let service: UniswapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniswapService],
    }).compile();

    service = module.get<UniswapService>(UniswapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
