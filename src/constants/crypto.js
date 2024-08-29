export const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

export const sepolia = {
  chainId: 11155111,
  name: "Sepolia",
  currency: "ETH",
  explorerUrl: "https://sepolia.etherscan.io",
  rpcUrl: "https://ethereum-sepolia-rpc.publicnode.com",
};

export const bscTestnet = {
  chainId: 97,
  currency: "tBNB",
  name: "BNB Smart Chain Testnet",
  explorerUrl: "https://testnet.bscscan.com",
  rpcUrl: "https://bsc-testnet-rpc.publicnode.com",
};

// 3. Create a metadata object
export const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};
