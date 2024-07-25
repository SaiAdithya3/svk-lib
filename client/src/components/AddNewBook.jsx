import React, { useState } from 'react';
import { addBook } from '../services/services';
import { toast } from 'sonner';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import axios from 'axios';

const AddNewBook = () => {
    const [book, setBook] = useState({
        title: '',
        bookid: '',
        isbn: '',
        author: '',
        genre: '',
        description: '',
        totalCopies: '',
        availableCopies: '',
        location: '',
        image: null,
        coverUrl: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setBook((prevBook) => ({
            ...prevBook,
            [id]: value
        }));

        if (id === 'isbn' && value.length === 13) {
            fetchBookDetails(value);
        }
    };

    const handleFileChange = (e) => {
        setBook((prevBook) => ({
            ...prevBook,
            image: e.target.files[0]
        }));
    };

    const fetchBookDetails = async (isbn) => {
        try {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
            const bookData = response.data.items[0].volumeInfo;
            const coverUrl = bookData.imageLinks?.thumbnail || '';
            setBook((prevBook) => ({
                ...prevBook,
                title: bookData.title || '',
                author: bookData.authors ? bookData.authors.join(', ') : '',
                genre: bookData.categories ? bookData.categories.join(', ') : '',
                description: bookData.description || '',
                coverUrl: coverUrl
            }));
        } catch (error) {
            console.error('Error fetching book details:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addBook(book).then((response) => {
                toast.success(response.message);
                setBook({
                    title: '',
                    bookid: '',
                    isbn: '',
                    author: '',
                    genre: '',
                    description: '',
                    totalCopies: '',
                    availableCopies: '',
                    location: '',
                    image: null,
                    coverUrl: ''
                });
            });
        } catch (error) {
            toast.error('Failed to add book. Please try again.');
        }
    };

    return (
        <div className="w-full flex py-6 flex-col px-6 items-center">
            <h1 className="text-2xl text-start w-full font-bold text-gray-800 mb-4">Add a New Book</h1>
            <div className="flex flex-row w-full max-w-4xl">
                <form className="w-full" onSubmit={handleSubmit}>
                    <InputField id="title" label="Title" value={book.title} onChange={handleChange} placeholder="Book Title" />
                    <InputField id="isbn" label="ISBN" value={book.isbn} onChange={handleChange} placeholder="ISBN Number" />
                    <InputField id="bookid" label="Book ID" value={book.bookid} onChange={handleChange} placeholder="Book ID" />
                    <InputField id="author" label="Author" value={book.author} onChange={handleChange} placeholder="Author Name" />
                    <InputField id="genre" label="Genre" value={book.genre} onChange={handleChange} placeholder="Genre" />
                    <TextAreaField id="description" label="Description" value={book.description} onChange={handleChange} placeholder="Book Description" />
                    <InputField id="totalCopies" label="Total Copies" value={book.totalCopies} onChange={handleChange} placeholder="Total Books" />
                    <InputField id="availableCopies" label="Available Copies" value={book.availableCopies} onChange={handleChange} placeholder="Available Copies" />
                    <InputField id="location" label="Location" value={book.location} onChange={handleChange} placeholder="Book Location" />
                    <InputField id="image" label="Image" type="file" onChange={handleFileChange} placeholder="Book Image" />
                    <div className="flex items-center justify-between">
                        <button className="bg-zinc-900 hover:bg-zinc-800 py-2 text-white font-bold w-full rounded-lg focus:outline-none focus:shadow-outline" type="submit">
                            Add Book
                        </button>
                    </div>
                </form>
                {book.coverUrl && (
                    <div className="ml-6">
                        <img src={book.coverUrl} alt="Book Cover" className="w-80 h-auto" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddNewBook;
