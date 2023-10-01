require('dotenv').config();
console.log(`ROBOT_ADDRESS: ${process.env.ROBOT_ADDRESS}`)

const AUT = artifacts.require("AUT");
const BN = require("bn.js");
const fs = require('fs');

// Mint: 150 000 000 AUT
const amount = new BN(150 * (10 ** 6)).mul((new BN(10)).pow(new BN(18)));
const transferAmount = new BN(1 * (10 ** 3)).mul((new BN(10)).pow(new BN(18)));

module.exports = async function (deployer) {
  await deployer.deploy(AUT, "Autentic Utility Token", "AUT", amount);
  fs.writeFileSync("AUT.dat", AUT.address + " " + config.from, {encoding: "utf8"});

  AUTInst = await AUT.deployed();
  await AUTInst.transfer(process.env.ROBOT_ADDRESS, transferAmount);
};
