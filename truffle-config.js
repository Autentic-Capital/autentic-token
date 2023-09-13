require('dotenv').config();

const PKEY = process.env.PKEY;
const API_bsc = process.env.API_bsc;
const API_snowtrace = process.env.API_snowtrace;

const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {

    plugins: [
        'truffle-plugin-verify'
    ],

    api_keys: {
        bscscan: API_bsc,
        snowtrace: API_snowtrace
    },

    dashboard: {
        port: 24012,
    },

    networks: {
        develop: {
            host: "127.0.0.1",     // Localhost (default: none)
            port: 9545,            // Standard Ethereum port (default: none)
            network_id: "*",       // Any network (default: none)
        },

        development: {
            host: "127.0.0.1",     // Localhost (default: none)
            port: 8545,            // Standard Ethereum port (default: none)
            network_id: "*",       // Any network (default: none)
        },

        bsc_testnet: {
            provider: () => new HDWalletProvider(PKEY, `https://data-seed-prebsc-1-s1.binance.org:8545`),
            network_id: 97,
            confirmations: 5,    // # of confirmations to wait between deployments. (default: 0)
            timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
            //skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
        },

        fuji: {
            provider: () => new HDWalletProvider(PKEY, `https://api.avax-test.network/ext/bc/C/rpc`),
            network_id: 43113,
            confirmations: 5,    // # of confirmations to wait between deployments. (default: 0)
            timeoutBlocks: 16000,  // # of blocks before a deployment times out  (minimum/default: 50)
            networkCheckTimeout: 999999,
            //skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
        },

        subsoluFuji: {
            provider: () => new HDWalletProvider(PKEY, `http://cifris-node-2.8al.ru:19651/ext/bc/2Smsow4GjDpu2jQDGAVh85fWhXqx18iBnkPPHC1j8wTDpMgwdd/rpc`),
            network_id: "*",
            confirmations: 0,   // Потому что блок создаётся, только если есть транзакции
            timeoutBlocks: 8000,
            skipDryRun: true,
            networkCheckTimeout: 2000000000,
            // gasPrice: web3.utils.toWei('1', 'gwei'), // 27.5 по факту
            gas: 80000000,
        },
    },

    // Set default mocha options here, use special reporters, etc.
    mocha: {
        // timeout: 100000
    },

    // Configure your compilers
    compilers: {
        solc: {
            version: "0.8.19", // Fetch exact version from solc-bin (default: truffle's version)
            // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
            settings: {          // See the solidity docs for advice about optimization and evmVersion
                optimizer: {
                    enabled: false,
                    runs: 200
                },
                //  evmVersion: "byzantium"
            }
        }
    }


    // Truffle DB is currently disabled by default; to enable it, change enabled:
    // false to enabled: true. The default storage location can also be
    // overridden by specifying the adapter settings, as shown in the commented code below.
    //
    // NOTE: It is not possible to migrate your contracts to truffle DB and you should
    // make a backup of your artifacts to a safe location before enabling this feature.
    //
    // After you backed up your artifacts you can utilize db by running migrate as follows:
    // $ truffle migrate --reset --compile-all
    //
    // db: {
    //   enabled: false,
    //   host: "127.0.0.1",
    //   adapter: {
    //     name: "indexeddb",
    //     settings: {
    //       directory: ".db"
    //     }
    //   }
    // }
};
