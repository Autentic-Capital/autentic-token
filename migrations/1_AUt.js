require('dotenv').config();
console.log(`ROBOT_ADDRESS: ${process.env.ROBOT_ADDRESS}`)

const AUt = artifacts.require("AUt");
const BN = require("bn.js");
const fs = require('fs');

// Mint: 150 000 000 AUt
const amount = new BN(150 * (10 ** 6)).mul((new BN(10)).pow(new BN(18)));
const transferAmount = new BN(1 * (10 ** 3)).mul((new BN(10)).pow(new BN(18)));

module.exports = async function (deployer) {
  await deployer.deploy(AUt, "Autentic Utility Token", "AUt", amount);
  fs.writeFileSync("AUt.dat", AUt.address + " " + config.from, {encoding: "utf8"});

  AUtInst = await AUt.deployed();
  await AUtInst.transfer(process.env.ROBOT_ADDRESS, transferAmount);
};
