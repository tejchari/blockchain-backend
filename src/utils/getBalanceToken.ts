
export async function getBalanceToken(contract, walletAddress) {
  
  const decimals = await contract.methods.decimals().call();
  const balance = await contract.methods.balanceOf(walletAddress).call();
  console.log('Balance before: ', balance);
  return balance / 10 ** decimals;
}
