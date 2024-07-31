import axios from 'axios';
import { toast } from 'sonner';
const BASE_URL = 'http://localhost:3000';

export const addBook = async (book) => {
    if (!book) {
        toast.error('Book is required');
        return;
    }
    try {
        // const response = await axios.post(`${BASE_URL}/book/addbook`, book, { headers: { 'Content-Type': 'application/json' } });
        const response = await axios.post(`${BASE_URL}/book/addbook`, book);
        toast.success('Book added successfully');
        return response;
    } catch (error) {
        toast.error(error.response.data.error || 'An error occurred');
        console.log(error.response.data.error);
    }
}

export const updateBook = async (book) => {
    if (!book.isbn) {
        toast.error('ISBN is required');
        return;
    }
    try {
        const response = await axios.post(`${BASE_URL}/book/updatebook`, book);
        toast.success('Book updated successfully');
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.error || 'An error occurred');
        console.error(error.response?.data?.error || error.message);
    }
};


export const isBookExists = async (isbn) => {
    try {
        const response = await axios.get(`${BASE_URL}/book/isBookExists?isbn=${isbn}`);
        return response.data;
    } catch (error) {
        console.error('Error checking if book exists:', error);
        // throw error;
    }
}


export const getBooks = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/book/getbooks`);
        return response.data;
    } catch (error) {
        toast.error('An error occurred');
        console.error(error);
    }
}
export const searchBooks = async (query) => {
    try {
        const response = await axios.get(`${BASE_URL}/book/searchbook`, {
            params: { query },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};

export const borrowBooks = async (studentId, bookIds) => {
    try {
        const response = await axios.post(`${BASE_URL}/loan/add-loan`, { studentId, bookIds });
        return response.data;
    } catch (error) {
        console.error('Error borrowing books:', error);
        throw error;
    }
};


export const searchStudentById = async (studentId) => {
    try {
        const response = await axios.get(`${BASE_URL}/student/${studentId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching student:', error);
        throw error;
    }
};

export const fetchAllLoans = async () => {
    try {
      const response = await fetch(`${BASE_URL}/loan/all-loans`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
  
      if (!Array.isArray(data.loans)) {
        throw new Error('Expected data.loans to be an array');
      }
  
      return data.loans; 
    } catch (error) {
      console.error('Error fetching all loans:', error);
      throw error;
    }
  };
  
export const unreturnedBooks1 = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/loan/unreturned-books`);
        return response.data;
    } catch (error) {
        console.error('Error fetching unreturned books:', error);
        throw error;
    }
};