// SIMONOTES got from codesandbox code - is it correct?
import mongoose from "mongoose";

const KeyCreateSchema = new mongoose.Schema({
  user_id: {
    type: String
  },
  public_key: {
    type: String
  }
});

export default mongoose.model("KeyCreate", KeyCreateSchema);
