import { ethers } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Provider } from "zksync-ethers";
import { getWallet, verifyContract } from "./utils";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

// load env file
import dotenv from "dotenv";
dotenv.config();
const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || "";

export default async function (hre: HardhatRuntimeEnvironment) {
  const flatPriceSaleFactory_v_2_1Address =
    "0xe21eBDd622388E15707b9B94187cC1B537f954f3";

  const provider = new Provider(
    // @ts-ignore
    hre.userConfig.networks?.zkSyncMainnet?.url
  );
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);
  const log = (message: string) => {
    console.log(message);
  }
  const wallet = getWallet();
  const deployer = new Deployer(hre, wallet);

  const contractArtifactName = "FlatPriceSaleFactory_v_2_1";
  const contractArtifact = await hre.artifacts.readArtifact(contractArtifactName);
  const flatPriceSaleFactory_v_2_1Contract = new ethers.Contract(
    flatPriceSaleFactory_v_2_1Address,
    contractArtifact.abi,
    signer
  );

  // Define example parameters for the `newSale` function
  const feeBips = 0;
  const feeRecipient = "0x0000000000000000000000000000000000000000";
  const owner = "0xb4B95fC47Bb797AcC777e5A2AA27c23C294637eE"; // Owner address
  const config = {
    recipient: "0xb4B95fC47Bb797AcC777e5A2AA27c23C294637eE", // Address of the recipient
    merkleRoot:
      "0xd8f40d4066981cc19d5b89c9772581b63409b1a1ce863c1103396cd57587ee81", // Merkle root as bytes32
    saleMaximum: "2000000000", // Maximum sale amount
    userMaximum: "2000000000", // Maximum per user
    purchaseMinimum: "1000000000", // Minimum purchase amount
    startTime: 1718909040, // Start time in UNIX timestamp
    endTime: 1719513840, // End time in UNIX timestamp
    maxQueueTime: 0, // Maximum queue time in seconds
    URI: "ipfs://QmXsPfyn9Hp41LsCpHMg44ecynS8LcvEPPF9xD7EsNKSrv" // Metadata URI
  };
  const baseCurrency = "USD";
  const nativePaymentsEnabled = true;
  const nativeTokenPriceOracle = "0x3BB095E86604c230c0eEC4D7362b5df7cB462035";
  const tokens = [];
  const oracles = [];
  const decimals = [];
  const allParams = [feeBips, feeRecipient, owner, config, baseCurrency, nativePaymentsEnabled, nativeTokenPriceOracle, tokens, oracles, decimals];

  // Use the factory to create a new Sale
  let createTx = await flatPriceSaleFactory_v_2_1Contract.newSale(...allParams);
  let createTxResult = await createTx.wait();
  let newSaleAddress = createTxResult.contractAddress;

  const contractArtifactSaleName = "FlatPriceSale_v_2_1";
  const contractArtifactSale = await hre.artifacts.readArtifact(contractArtifactSaleName);
  const contractSourceSale = `${contractArtifactSale.sourceName}:${contractArtifactSale.contractName}`;

  console.log(`🚀 New FlatPriceSale_v_2_1 deployed at: ${newSaleAddress}`);

  const contractZKArtifactSale = await deployer.loadArtifact(contractArtifactSaleName).catch((error) => {
    if (error?.message?.includes(`Artifact for contract "${contractArtifactName}" not found.`)) {
      console.error(error.message);
      throw `⛔️ Please make sure you have compiled your contracts or specified the correct contract name!`;
    } else {
      throw error;
    }
  });
  const contract = await deployer.deploy(contractZKArtifactSale, allParams);
  let encodedAllParams = contract.interface.encodeDeploy(allParams);
  log(`Requesting contract verification...`);
  await verifyContract({
    address: newSaleAddress,
    contract: contractSourceSale,
    constructorArguments: encodedAllParams,
    bytecode: contractZKArtifactSale.bytecode,
  });

  console.log('✅ Sale creation and verification complete!');

  // Use the factory to create a new Sale
  createTx = await flatPriceSaleFactory_v_2_1Contract.newSale(...allParams);
  createTxResult = await createTx.wait();
  newSaleAddress = createTxResult.contractAddress;

  log(`Requesting contract verification...`);
  await verifyContract({
    address: newSaleAddress,
    contract: contractSourceSale,
    constructorArguments: encodedAllParams,
    bytecode: contractZKArtifactSale.bytecode,
  });

  console.log(`🚀 New FlatPriceSale_v_2_1 deployed at: ${newSaleAddress}`);
  console.log('✅ Sale creation and verification complete!');

  console.log("✅ Deployment complete!");
}
