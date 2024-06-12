import { deployContract, getWallet } from "./utils";
import { ethers } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import * as hre from "hardhat";

export default async function (hre: HardhatRuntimeEnvironment) {
  let contractArtifactName = "TrancheVestingMerkleDistributor";
  let constructorArguments = [];
  const trancheVestingMerkleDistributor = await deployContract(
    contractArtifactName,
    constructorArguments
  );
  console.log(`🏭 trancheVestingMerkleDistributor address: ${trancheVestingMerkleDistributor.target}`);
  contractArtifactName = "TrancheVestingMerkleDistributorFactory";
  constructorArguments = [trancheVestingMerkleDistributor.target.toString()];
  const trancheVestingMerkleDistributorFactory = await deployContract(
    contractArtifactName,
    constructorArguments
  );
  console.log(
    `🏭 trancheVestingMerkleDistributorFactory address: ${trancheVestingMerkleDistributorFactory.target}`
  );
  console.log("✅ Deployment complete!");
}
