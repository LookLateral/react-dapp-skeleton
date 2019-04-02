import "../config/config";
import config from "../config/config";
const BigchainDB = require("bigchaindb-driver");
const bip39 = require("bip39");
 
function createKey() {
  const mnemonic = config.seedPhrase;
  const seed = bip39.mnemonicToSeed(mnemonic).slice(0, 32);
  let user = new BigchainDB.Ed25519Keypair(seed);
 
  console.log(user.publicKey);
}
 
module.exports = createKey;