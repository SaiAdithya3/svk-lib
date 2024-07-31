import mongoose from 'mongoose';

const loanSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'student', required: true },
  bookCopyCodes: [{ type: String, required: true }],
  status: { type: String, enum: ['borrowed', 'returned'], default: 'borrowed' },
  date: { type: Date, default: Date.now },
  returned: { type: Date }
});

export default mongoose.model('Loan', loanSchema);
