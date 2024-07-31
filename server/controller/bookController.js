import Book from '../schemas/bookSchema.js';

export const addBook = async (req, res) => {
  const {
    title,
    isbn,
    author,
    genre,
    category,
    copies,
    location,
  } = req.body;

  if (!title || !copies || copies.length === 0) {
    return res.status(400).json({ error: 'Title and at least one copy are required' });
  }

  const newBook = new Book({
    title,
    isbn,
    author,
    genre,
    category,
    copies,
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

