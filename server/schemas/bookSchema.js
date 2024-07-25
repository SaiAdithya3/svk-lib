import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  bookid: {
    type: String,
    unique: true,
  },
  isbn: {
    type: String,
    unique: true,
  },
  author: {
    type: String,
  },
  genre: {
    type: String,
  },
  category: {
    type: String,
  },
  totalCopies: {
    type: Number,
  },
  availableCopies: {
    type: Number,
  },
  location: {
    type: String,
  },
});

export default mongoose.model('Book', bookSchema);
