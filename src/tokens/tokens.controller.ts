import { Controller, Get, Param } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('tokens')
@ApiTags('tokens')
export class TokensController {
  constructor(private tokensService: TokensService) {}

  @Get('balance/:network/:tokenAddress/:walletAddress')
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

  @Get('balanceUSDT/:network/:tokenAddress/:walletAddress')
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
