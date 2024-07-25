import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "pending",
  },
  bookId: {
    type: Array,
    required: true,
  },
  returned: {
    type: Date,
  },
});

export default mongoose.model("Loan", loanSchema);