import { deployContract, getWallet } from "./utils";
import { ethers } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import * as hre from "hardhat";

export default async function (hre: HardhatRuntimeEnvironment) {
  let contractArtifactName = "ContinuousVestingMerkleDistributor";
  let constructorArguments = [];
  const continuousVestingMerkleDistributor = await deployContract(
    contractArtifactName,
    constructorArguments
  );
  console.log(`🏭 continuousVestingMerkleDistributor address: ${continuousVestingMerkleDistributor.target}`);
  contractArtifactName = "ContinuousVestingMerkleDistributorFactory";
  constructorArguments = [continuousVestingMerkleDistributor.target.toString()];
  const continuousVestingMerkleDistributorFactory = await deployContract(
    contractArtifactName,
    constructorArguments
  );
  console.log(
    `🏭 continuousVestingMerkleDistributorFactory address: ${continuousVestingMerkleDistributorFactory.target}`
  );
  console.log("✅ Deployment complete!");
}
