import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import ABI from '../abis/smart_contract.json';
import { getBalanceToken } from 'src/utils/getBalanceToken';
import { getBalanceInUSDT } from 'src/utils/getBalanceInUSDT';
import { Cache } from 'cache-manager';

const networks = {
  eth_mainnet: 'https://eth-rpc.gateway.pokt.network',
  eth_ropsten: 'https://ropsten-eth-rpc.gateway.pokt.network',
  eth_rinkeby: 'https://rinkeby-eth-rpc.gateway.pokt.network',
  eth_kovan: 'https://kovan-eth-rpc.gateway.pokt.network',
  eth_goerli: 'https://goerli-eth-rpc.gateway.pokt.network',
  polygon: 'https://poly-rpc.gateway.pokt.network/',
  bsc: 'https://bsc-rpc.gateway.pokt.network',
};

@Injectable()
export class TokensService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getBalance(
    network: string,
    tokenAddress: string,
    walletAddress: string,
  ) {
    const endpoint = networks[network];
    if (!endpoint) {
      throw new Error(`Unknown network: ${network}`);
    }
    const web3 = new Web3(endpoint);
    const contract = new web3.eth.Contract(ABI as AbiItem[], tokenAddress);
    const balance = await getBalanceToken(contract, walletAddress);
    const symbol = await contract.methods.symbol().call();

    console.log('Balance after: ', balance);
    console.log('Symbol: ', symbol);
    return { balance, symbol };
  }

  async getBalanceInUSDT(
    network: string,
    tokenAddress: string,
    walletAddress: string,
  ) {
    const { balance, symbol } = await this.getBalance(
      network,
      tokenAddress,
      walletAddress,
    );
    const balanceInUSDT = await getBalanceInUSDT(balance, symbol);

    console.log('Balance in USDT: ', balanceInUSDT);
    return balanceInUSDT;
  }

  async getCoinBalances(walletAddress: string) {
    const web3Eth = await new Web3(networks['eth_mainnet']);
    let balETH = await web3Eth.eth.getBalance(walletAddress);
    balETH = web3Eth.utils.fromWei(balETH);

    const web3BNB = await new Web3(networks['bsc']);
    let balBNB = await web3BNB.eth.getBalance(walletAddress);
    balBNB = web3Eth.utils.fromWei(balBNB);

    const web3MATIC = await new Web3(networks['polygon']);
    let balMATIC = await web3MATIC.eth.getBalance(walletAddress);
    balMATIC = web3Eth.utils.fromWei(balMATIC);

    console.log('Balance on Ethereum: ', balETH);
    console.log('Balance on Binance: ', balBNB);
    console.log('Balance on Polygon: ', balMATIC);

    return { ethereum: balETH, binance: balBNB, polygon: balMATIC };
  }
}
