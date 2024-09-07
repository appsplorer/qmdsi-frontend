swap_abi = [
    {
        "inputs": [
            {"internalType": "address", "name": "_priceFeed", "type": "address"},
            {"internalType": "address", "name": "_usdt", "type": "address"},
            {"internalType": "address", "name": "_token", "type": "address"},
            {"internalType": "address", "name": "_treasury", "type": "address"},
        ],
        "stateMutability": "nonpayable",
        "type": "constructor",
    },
    {
        "inputs": [],
        "name": "GRAMS_PER_QMGT",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [{"internalType": "uint256", "name": "usdAmount", "type": "uint256"}],
        "name": "buyQmgt",
        "outputs": [{"internalType": "uint256", "name": "tokens", "type": "uint256"}],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [],
        "name": "getLatestGoldPrice",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [{"internalType": "uint256", "name": "usdAmount", "type": "uint256"}],
        "name": "getQmgtAmount",
        "outputs": [
            {"internalType": "uint256", "name": "qmgtAmount", "type": "uint256"}
        ],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [],
        "name": "getTokenAddress",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [
            {"internalType": "uint256", "name": "tokenAmount", "type": "uint256"}
        ],
        "name": "getUsdAmount",
        "outputs": [
            {"internalType": "uint256", "name": "usdAmount", "type": "uint256"}
        ],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [],
        "name": "getUsdtAddress",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [
            {"internalType": "uint256", "name": "tokenAmount", "type": "uint256"}
        ],
        "name": "sellQmgt",
        "outputs": [
            {"internalType": "uint256", "name": "usdAmount", "type": "uint256"}
        ],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [
            {"internalType": "address", "name": "_token", "type": "address"},
            {"internalType": "uint256", "name": "amount", "type": "uint256"},
        ],
        "name": "withdrawToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
]
