import {
  CacheKey,
  CacheTTL,
  Controller,
  Get,
  Param,
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common';
import { TokensService } from './tokens.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('tokens')
@ApiTags('tokens')
export class TokensController {
  constructor(private tokensService: TokensService) {}

  @UseInterceptors(CacheInterceptor)
  @Get('balance/:network/:tokenAddress/:walletAddress')
  @CacheTTL(300) //5 minutes = 300 secs
  async getBalance(
    @Param('network') network: string,
    @Param('tokenAddress') tokenAddress: string,
    @Param('walletAddress') walletAddress: string,
  ) {
    const { balance, symbol } = await this.tokensService.getBalance(
      network,
      tokenAddress,
      walletAddress,
    );
    return { balance, symbol };
  }

  @UseInterceptors(CacheInterceptor)
  @Get('balanceUSDT/:network/:tokenAddress/:walletAddress')
  @CacheTTL(300) //5 minutes = 300 secs
  async getBalanceInUSDT(
    @Param('network') network: string,
    @Param('tokenAddress') tokenAddress: string,
    @Param('walletAddress') walletAddress: string,
  ) {
    const balanceInUSDT = await this.tokensService.getBalanceInUSDT(
      network,
      tokenAddress,
      walletAddress,
    );
    return { balanceInUSDT };
  }
}
