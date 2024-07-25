import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
  },
  category: {
    type: String,
  },
  totalCopies: {
    type: Number,
    required: true,
  },
  availableCopies: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Book", bookSchema);
