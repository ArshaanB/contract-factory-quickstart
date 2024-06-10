import { deployContract } from "./utils";
import { ethers } from "ethers";

export default async function () {
  const contractArtifactName = "GenericERC20";
  // `parseEther` converts ether to wei, and `.toString()` ensures serialization compatibility.
  const constructorArguments = [
    "ABC Token",
    "ABC",
    18,
    ethers.parseEther("1000000").toString()
  ];
  await deployContract(contractArtifactName, constructorArguments);
}
