import { ethers } from "ethers";
import BuyMeACoffee from './BuyMeACoffee.json'
const provider=new ethers.providers.Web3Provider(window.ethereum);
const signer=provider.getSigner();
const buymeACoffee=new ethers.Contract('0xf600f6dA31Dbd5FD6954735A7542860380483Ef7',BuyMeACoffee.abi,signer);
export default buymeACoffee;