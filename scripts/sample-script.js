
const hre = require("hardhat");
const getBalances=async(addresses)=>{
  let id=0;
for(let address of addresses){
  const balance=await hre.ethers.provider.getBalance(address);
  const balanceinETH= hre.ethers.utils.formatEther(balance)
  console.log(id+' :'+balanceinETH)
  id++;
}
}
const printMemos=async(memos)=>{
for(let memo of memos){
  const name=memo.name;
  const message=memo.message;
  const timestamp=memo.timestamp;
  const from =memo.from;
  console.log(`${name} said ${message} At ${timestamp} address: ${from}`)
}
}
async function main() {
  const [owner,tipper1,tipper2,tipper3]=await hre.ethers.getSigners();
 const BUYMEACOFFEE=await hre.ethers.getContractFactory('BuyMeACoffee');
 const buymeacoffee=await BUYMEACOFFEE.deploy()
  await buymeacoffee.deployed();
  console.log(`address of Contract : ${buymeacoffee.address}`)

  const addresses=[owner.address,tipper1.address,buymeacoffee.address];
  await getBalances(addresses)
  const tip={value:hre.ethers.utils.parseEther('1')}
  await buymeacoffee.connect(tipper1).BuyACoffee('Sufyan','Chai peelo',tip)
  await buymeacoffee.connect(tipper2).BuyACoffee('Mannu','Chai peelo',tip)
  await buymeacoffee.connect(tipper3).BuyACoffee('Pasha','Chai peelo',tip)
  console.log('after buying coffee')
  await getBalances(addresses);

  console.log('== withdraw ==')
  await buymeacoffee.withdrawTips();

  console.log('==memos==')
  const memos=await buymeacoffee.getMemos();
  await printMemos(memos);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
