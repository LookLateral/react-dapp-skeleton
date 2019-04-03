// SIMONOTES is it correct?
import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  /*
  SIMONOTES: what in here??
  user_id: {
    type: String
  },
  transaction_key: {
    type: String
  }*/
});

export default mongoose.model("Transaction", TransactionSchema);
