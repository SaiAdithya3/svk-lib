import axios from 'axios';
import { toast } from 'sonner';
const BASE_URL = 'http://localhost:3000';

export const addBook = async (book) => {
    if (!book) {
        toast.error('Book is required');
        return;
    }
    try {
        const response = await axios.post(`${BASE_URL}/book/addbook`, book);
        toast.success('Book added successfully');
        return response;
    } catch (error) {
        toast.error('An error occurred');
        console.error(error);
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