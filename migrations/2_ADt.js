const ADt = artifacts.require("ADt");
const BN = require("bn.js");
const fs = require('fs');

const amount = new BN(50 * (10 ** 5)).mul((new BN(10)).pow(new BN(18)));

module.exports = async function (deployer) {
    await deployer.deploy(ADt, "Autentic DAO token", "ADt", amount);
    fs.writeFileSync("ADt.dat", ADt.address + " " + config.from, {encoding: "utf8"});

    ADtInst = await ADt.deployed();
    await ADtInst.mint(amount);
};
