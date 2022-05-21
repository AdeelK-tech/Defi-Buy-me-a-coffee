const hre = require("hardhat");
async function main(){
    const BUYMEACOFFEE=await hre.ethers.getContractFactory('BuyMeACoffee');
 const buymeacoffee=await BUYMEACOFFEE.deploy()
  await buymeacoffee.deployed();
  console.log(`address of Contract : ${buymeacoffee.address}`)
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });