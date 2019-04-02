const bip39 = require("bip39");
 
const config = {
  seedPhrase: process.env.SEED || bip39.generateMnemonic()
};
 
export default config;