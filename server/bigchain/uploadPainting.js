const BigchainDB = require('bigchaindb-driver')
const API_PATH = 'https://test.bigchaindb.com/api/v1/'
const conn = new BigchainDB.Connection(API_PATH)

const bip39 = require('bip39')
const seed = bip39.mnemonicToSeed('seedPhrase').slice(0,32)
const alice = new BigchainDB.Ed25519Keypair(seed)


// UPLOAD ARTWORK IN BIGCHAIN

let uploadPainting = {
    productId:'',
    name: '',
    author: '',
    owner: '',
}
let metaUploadPainting = {
    value_eur:'',
    value_btc: '',
}

const initPaintingForUpload = (_productId, _name, _author, _owner, _tokenqty, _value_eur, _value_btc) => {  
    uploadPainting.productId = _productId;
    uploadPainting.name = _name;
    uploadPainting.author = _author;
    uploadPainting.owner = _owner;
    uploadPainting.tokenqty = _tokenqty;
    metaUploadPainting.value_eur = _value_eur;
    metaUploadPainting.value_btc = _value_btc;
    createPaint();
  }

function createPaint() {
    const txCreatePaint = BigchainDB.Transaction.makeCreateTransaction(
        {
            uploadPainting,
        },
        {
            datetime: new Date().toString(),
            value: {
                value_eur: metaUploadPainting.value_eur,
                value_btc: metaUploadPainting.value_btc,
            }
        },
        [BigchainDB.Transaction.makeOutput(
            BigchainDB.Transaction.makeEd25519Condition(alice.publicKey))],
        alice.publicKey
    )
    const txSigned = BigchainDB.Transaction.signTransaction(txCreatePaint,
        alice.privateKey)

    conn.postTransactionCommit(txSigned)
        .then(res => {
            document.body.innerHTML += '<h3>Transaction created</h3>';
            document.body.innerHTML += txSigned.id
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

export { initPaintingForUpload }