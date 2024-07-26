import Book from '../schemas/bookSchema.js';

export const addBook = async (req, res) => {
  const {
    title,
    bookid,
    isbn,
    author,
    genre,
    category,
    totalCopies,
    availableCopies,
    location,
  } = req.body;
  console.log(req.body);

  if (!title || !bookid || !totalCopies) {
    return res.status(400).json({ error: 'All fields are required' });
  }


  const existingBook = await Book.findOne({ bookid });
  if (existingBook) {
    return res.status(400).json({ error: 'Book with this ID already exists' });
  }

  const newBook = new Book({
    title,
    bookid,
    isbn,
    author,
    genre,
    category,
    totalCopies,
    availableCopies,
    location,
  });

  try {
    await newBook.save();
    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (error) {
    res.status(500).json({ error: 'Error adding the book', details: error.message });
  }
};

export const getBooks = async (req, res) => {
  const { page = 1, search = '' } = req.query;
  const limit = 15;
  const skip = (page - 1) * limit;

  try {
    const regexSearch = new RegExp(search, 'i'); 
    const totalBooks = await Book.countDocuments({
      $or: [
        { title: regexSearch },
        { isbn: regexSearch },
        { author: regexSearch },
        { location: regexSearch },
      ],
    });
    const books = await Book.find({
      $or: [
        { title: regexSearch },
        { isbn: regexSearch },
        { author: regexSearch },
        { location: regexSearch },
      ],
    })
    .skip(skip)
    .limit(limit);
    
    const totalPages = Math.ceil(totalBooks / limit);

    res.status(200).json({ books, totalPages });
  } catch (error) {
    res.status(500).json({ error: 'Error getting books', details: error.message });
  }
};


export const searchbook = async (req, res) => {
  const { query } = req.query;
  try {
    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { isbn: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } },
      ],
    });
    res.json({ books });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

