const BigchainDB = require('bigchaindb-driver')
const API_PATH = 'https://test.bigchaindb.com/api/v1/'
const conn = new BigchainDB.Connection(API_PATH)

const bip39 = require('bip39')
const seed = bip39.mnemonicToSeed('seedPhrase').slice(0,32)
const alice = new BigchainDB.Ed25519Keypair(seed)


/* SIMONOTES: 
to fix: define what is painting ()*/


let painting = {
    productId:'',
    name: '',
    //author: '',
    owner: '',
}
/*let metaPainting = {
    value_eur:'',
    value_btc: '',
}*/


let tokenization = {
    productId:'',
    name: '',
    owner: '',
    tokenqty: '',
}
/*let metaTokenization = {
    value_eur:'',
    value_btc: '',
}*/


const initPaintingForUpload = (_productId, _name, _owner, _tokenqty/*, _value_eur, _value_btc*/) => {  
    painting.productId = _productId;
    painting.name = _name;
    //painting.author = _author;
    painting.owner = _owner;
    painting.tokenqty = _tokenqty;
    //metaPainting.value_eur = _value_eur;
    //metaPainting.value_btc = _value_btc;
    createPaint();

  }
const initTokanization = (_productId, _name, _owner, _tokenqty/*, _value_eur, _value_btc*/) => {   
    tokenization.productId = _productId;
    tokenization.name = _name;
    tokenization.owner = _owner;
    tokenization.tokenqty = _tokenqty;
    //metaTokenization.value_eur = _value_eur;
    // metaTokenization.value_btc = _value_btc;
    tokenLaunch();
  }




function createPaint() {
    const txCreatePaint = BigchainDB.Transaction.makeCreateTransaction(
        {
            painting,
        },
        {
            datetime: new Date().toString(),
            //metaPainting
        },
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

const nTokens = 10000
let tokensLeft
const tokenCreator = new BigchainDB.Ed25519Keypair(bip39.mnemonicToSeed('seedPhrase').slice(0,32))
let createTxId

function tokenLaunch() {
    // Construct a transaction payload
    const tx = BigchainDB.Transaction.makeCreateTransaction({
            token: '',
            number_tokens: nTokens
        },
        // Metadata field, contains information about the transaction itself
        // (can be `null` if not needed)
        {
            datetime: new Date().toString()
        },
        // Output: Divisible asset, include nTokens as parameter
        [BigchainDB.Transaction.makeOutput(BigchainDB.Transaction
          .makeEd25519Condition(tokenCreator.publicKey), nTokens.toString())],
        tokenCreator.publicKey
    )

    // Sign the transaction with the private key of the token creator
    const txSigned = BigchainDB.Transaction
      .signTransaction(tx, tokenCreator.privateKey)

    // Send the transaction off to BigchainDB
    conn.postTransactionCommit(txSigned)
        .then(res => {
            createTxId = res.id
            tokensLeft = nTokens
            document.body.innerHTML ='<h3>Transaction created</h3>';
            // txSigned.id corresponds to the asset id of the tokens
            document.body.innerHTML +=txSigned.id
        })
}


  
  export {
    initPaintingForUpload,
    initTokanization
  }