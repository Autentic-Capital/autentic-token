# autentic capital

## AUt

Общее число токенов которое будет выпущено 100 000 000 (Сто миллионов штук)
Первоначальная эмиссия составит 50 000 000 токенов.

## ADt

Autentic планирует выпустить 2.5 млн. токенов DAO


## Env file

https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts

Before deploy and verify need to make `".env"` file.
In it there must be `PKEY`, `API_bsc` and `API_fuji`:

    PKEY = 565ed ...
    API_bsc = ABCD1234...
    API_snowtrace = ABCDEF12345...

### compile:

truffle compile AUt.sol

### deploy to SoluChain:

truffle migrate --reset --network subsolu

### deploy to bsc_testnet:

truffle migrate -f 1 --to 1 --network bsc_testnet

### verify to Avalanche testnet (fuji):

truffle run verify AUt --network fiji --license UNLICENSED
truffle run verify ADt --network fiji --license UNLICENSED

### tests (see for usage):

truffle exec ./scripts/AuMarket_test.js
