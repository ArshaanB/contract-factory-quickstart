import { ethers } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Provider } from "zksync-ethers";

import * as ContractArtifact from "../artifacts-zk/contracts/sale/v2.1/FlatPriceSaleFactory.sol/FlatPriceSaleFactory_v_2_1.json";

// load env file
import dotenv from "dotenv";
dotenv.config();
const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || "";

export default async function (hre: HardhatRuntimeEnvironment) {
  // original
  // flatPriceSaleFactory_v_2_1Address: 0xC96D8047B0B812c10e798cB249402a15c5c0753F
  // cloneDeterministic/create2 alternative
  // flatPriceSaleFactory_v_2_1Address: 0xb0280B6d67fA691a479f94FC49B97f4020110C08
  const flatPriceSaleFactory_v_2_1Address =
    "0xC96D8047B0B812c10e798cB249402a15c5c0753F";

  const provider = new Provider(
    // @ts-ignore
    hre.userConfig.networks?.zkSyncSepoliaTestnet?.url
  );
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);
  const contract = new ethers.Contract(
    flatPriceSaleFactory_v_2_1Address,
    ContractArtifact.abi,
    signer
  );

  // Define example parameters for the `newSale` function
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
  const nativeTokenPriceOracle = "0x6D41d1dc818112880b40e26BD6FD347E41008eDA";
  const tokens = [];
  const oracles = [];
  const decimals = [];

  // Call `newSale` function on contract
  console.log(
    `The message is ${await contract.newSale(
      owner,
      config,
      baseCurrency,
      nativePaymentsEnabled,
      nativeTokenPriceOracle,
      tokens,
      oracles,
      decimals
    )}`
  );

  console.log("✅ Deployment complete!");
}
