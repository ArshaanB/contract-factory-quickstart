import { deployContract, getWallet } from "./utils";
import { ethers } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import * as hre from "hardhat";

export default async function (hre: HardhatRuntimeEnvironment) {
  let contractArtifactName = "FlatPriceSale_v_2_1";
  let constructorArguments = [0, "0x0000000000000000000000000000000000000000"];
  const flatPriceSale_v_2_1 = await deployContract(
    contractArtifactName,
    constructorArguments
  );
  console.log(`🏭 flatPriceSale_v_2_1 address: ${flatPriceSale_v_2_1.target}`);
  contractArtifactName = "FlatPriceSaleFactory_v_2_1";
  constructorArguments = [flatPriceSale_v_2_1.target.toString()];
  const flatPriceSaleFactory_v_2_1 = await deployContract(
    contractArtifactName,
    constructorArguments
  );
  console.log(
    `🏭 flatPriceSaleFactory_v_2_1 address: ${flatPriceSaleFactory_v_2_1.target}`
  );
  console.log("✅ Deployment complete!");

  // TRY IF VERIFY FAILS
  // const artifact = await hre.deployer.loadArtifact(
  //   "FlatPriceSaleFactory_v_2_1"
  // );
  // const res = await hre.run("verify", {
  //   address: "0xfbf8c0a3535dbbc4db77d2389689a65d0bbe6c3f",
  //   contract:
  //     "contracts/sale/v2.1/FlatPriceSaleFactory.sol:FlatPriceSaleFactory_v_2_1",
  //   constructorArgsParams: ["0xb919e67636704a20dd75fc0217f8d9035196f2b7"],
  //   bytecode: artifact.bytecode
  // });
  // console.log(res);
}
