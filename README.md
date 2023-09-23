# Autentic Capital

## AUt

Autentic Utility Token

## Env file

Before deploy and verify need to make `".env"` file.
In it there must be `PKEY`, `API_bsc` and `API_fuji`:

    PKEY = 565ed ...
    API_bsc = ABCD1234...
    API_snowtrace = ABCDEF12345...

### compile

truffle compile AUt.sol

### deploy to SoluChain

truffle migrate --reset --network subsolu

### deploy to bsc_testnet

truffle migrate -f 1 --to 1 --network bsc_testnet

### verify to Avalanche testnet

truffle run verify AUt --network fiji --license MIT
truffle run verify AUt --network bsc_testnet --license MIT

### tests (see for usage)

truffle exec ./scripts/AUt.js

### reference

https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts