const BigchainDB = require('bigchaindb-driver')
const API_PATH = 'https://test.bigchaindb.com/api/v1/'
const conn = new BigchainDB.Connection(API_PATH)

const bip39 = require('bip39')
const seed = bip39.mnemonicToSeed('seedPhrase').slice(0,32)
const alice = new BigchainDB.Ed25519Keypair(seed)

let painting = {
    productId:'',
    name: '',
    //author: 'Diego Rodríguez de Silva y Velázquez',
    owner: '',
    tokenqty: ''
}
/*let metadata = {
    value_eur:'',
    value_btc: '',
}*/

// SIMON: get params and set painting, then create
/*function initPainting(_productId, _name, _owner, _tokenqty, _value_eur, _value_btc){ 
    painting.productId = _productId;
    painting.name = _name;
    //painting.author = _author;
    painting.owner = _owner;
    painting.tokenqty = _tokenqty;

    metadata.value.value_eur = _value_eur;
    metadata.value.value_btc = _value_btc;

    createPaint();
}
*/

function createPaint() {
    // Construct a transaction payload
    const txCreatePaint = BigchainDB.Transaction.makeCreateTransaction(
        // Asset field
        {
            painting,
        },
        // Metadata field, contains information about the transaction itself (can be `null` if not needed)
        {
            datetime: new Date().toString(),
            //metadata
        },
        // Output. For this case we create a simple Ed25519 condition
        [BigchainDB.Transaction.makeOutput(
            BigchainDB.Transaction.makeEd25519Condition(alice.publicKey))],
        // Issuers
        alice.publicKey
    )
    // The owner of the painting signs the transaction
    const txSigned = BigchainDB.Transaction.signTransaction(txCreatePaint,
        alice.privateKey)

    // Send the transaction off to BigchainDB
    conn.postTransactionCommit(txSigned)
        .then(res => {
            document.body.innerHTML += '<h3>Transaction created</h3>';
            document.body.innerHTML += txSigned.id
            // txSigned.id corresponds to the asset id of the painting
        })
}


function transferOwnership(txCreatedID, newOwner) {
    // Get transaction payload by ID
    conn.getTransaction(txCreatedID)
        .then((txCreated) => {
            const createTranfer = BigchainDB.Transaction.
            makeTransferTransaction(
                // The output index 0 is the one that is being spent
                [{
                    tx: txCreated,
                    output_index: 0
                }],
                [BigchainDB.Transaction.makeOutput(
                    BigchainDB.Transaction.makeEd25519Condition(
                        newOwner.publicKey))],
                {
                    datetime: new Date().toString(),
                    value: {
                        value_eur: '30000000€',
                        value_btc: '2100',
                    }
                }
            )
            // Sign with the key of the owner of the painting (Alice)
            const signedTransfer = BigchainDB.Transaction
                .signTransaction(createTranfer, alice.privateKey)
            return conn.postTransactionCommit(signedTransfer)
        })
        .then(res => {
            document.body.innerHTML += '<h3>Transfer Transaction created</h3>'
            document.body.innerHTML += res.id
        })
}



//module.exports = initPainting

const initPainting = (_productId, _name, _owner, _tokenqty/*, _value_eur, _value_btc*/) => {
    
    painting.productId = _productId;
    painting.name = _name;
    //painting.author = _author;
    painting.owner = _owner;
    painting.tokenqty = _tokenqty;

    //metadata.value_eur = _value_eur;
   // metadata.value_btc = _value_btc;

    createPaint();

  }
  
  export {
    initPainting
  }