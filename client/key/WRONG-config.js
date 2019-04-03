// SIMONOTES: to be removed, these lines where added in /client/config/config.js

const bip39 = require("bip39");
 
const config = {
  seedPhrase: process.env.SEED || bip39.generateMnemonic()
};
 
export default config;