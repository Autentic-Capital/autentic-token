//---------------------------------------------------------
// usage:
// (progect_root)$ truffle exec ./scripts/AuthCenter_test.js --network <network name>
// NOTE:
//    dont't forget compile (recompile) all contracts
//---------------------------------------------------------

module.exports = async function() {
    console.log('--------------------------------------------');
    console.log('Test AuthCenter');
    console.log('--------------------------------------------');

    const fs = require('fs');
    const AuthCenter = artifacts.require("AuthCenter");
    const [authCenter_address, authCenter_owner] = fs.readFileSync("authCenter.dat",{encoding: "utf8"}).split(' ');
    let authCenter = await AuthCenter.at(authCenter_address);
    //console.log(authCenter);
    console.log("'AuthCenter' contract address:", authCenter_address);
    
    console.log('--------------------------------------------');
    result = await authCenter.isAdmin(authCenter_owner);
    console.log('check admin (must be true)',authCenter_owner,' : ',result);

    console.log('Discard ',authCenter_owner,' from admins');
    await authCenter.discardAdmin(authCenter_owner);
    result = await authCenter.isAdmin(authCenter_owner);
    console.log('check admin (must be false)',authCenter_owner,' : ',result);

    console.log('Add ',authCenter_owner,' to admins (we can do it from owner account)');
    await authCenter.addAdmin(authCenter_owner);
    result = await authCenter.isAdmin(authCenter_owner);
    console.log('check admin (must be true)',authCenter_owner,' : ',result);

    console.log('--------------------------------------------');
    console.log('add this accounts to clients:')
    const accounts = await web3.eth.getAccounts();
    for(let i=0; i<accounts.length-1; i++) {
        console.log(accounts[i]);
        await authCenter.addClient(accounts[i]);
    }
    console.log('--------------------------------------------');
    console.log("check clients accounts (last must be 'false'):");
    for(let account of accounts) {
        result = await authCenter.isClient(account);
        console.log(account,' ',result);
    }
    
    console.log('--------------------------------------------');
    console.log("remove 1 client");
    await authCenter.removeClient(accounts[8]);
    console.log('--------------------------------------------');
    console.log("check clients accounts again");
    for(let account of accounts) {
        result = await authCenter.isClient(account);
        console.log(account,' ',result);
    }    

    console.log('--------------------------------------------');
    console.log('freeze some accounts')
    await authCenter.freezeAddress(accounts[0]);
    await authCenter.freezeAddress(accounts[1]);
    await authCenter.freezeAddress(accounts[2]);
    await authCenter.freezeAddress(accounts[3]);

    console.log('--------------------------------------------');
    console.log("check clients accounts to 'frozen' property:");
    for(let account of accounts) {
        result = await authCenter.isAddressFrozen(account);
        console.log(account,' frozen ',result);
    }

    console.log('--------------------------------------------');
    console.log('unfreeze all accounts except second');
    await authCenter.unfreezeAddress(accounts[0]);
    for(let i=2; i<accounts.length; i++) {
        await authCenter.unfreezeAddress(accounts[i]);
    }

    console.log('--------------------------------------------');
    console.log("check clients accounts to 'frozen' property again:");
    for(let account of accounts) {
        result = await authCenter.isAddressFrozen(account);
        console.log(account,' frozen ',result);
    }

    console.log('--------------------------------------------');
    console.log('Paused contract')
    await authCenter.setContractPaused(authCenter_address);
    result = await authCenter.isContractPaused(authCenter_address);
    console.log('check (must be true) ',result);

    console.log('--------------------------------------------');
    console.log('Unpaused contract')
    await authCenter.setContractUnpaused(authCenter_address);
    result = await authCenter.isContractPaused(authCenter_address);
    console.log('check (must be false) ',result);

    process.exit(0);
}
