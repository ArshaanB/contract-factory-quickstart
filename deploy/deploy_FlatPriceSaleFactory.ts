import { deployContract } from "./utils";
import { HardhatRuntimeEnvironment } from "hardhat/types";

export default async function (hre: HardhatRuntimeEnvironment) {
  const contractArtifactName = "FlatPriceSaleFactory_v_2_1";
  const constructorArguments = [];
  const flatPriceSaleFactory_v_2_1 = await deployContract(
    contractArtifactName,
    constructorArguments
  );
  console.log(
    `🏭 flatPriceSaleFactory_v_2_1 address: ${flatPriceSaleFactory_v_2_1.target}`
  );
  console.log("✅ Deployment complete!");
}
