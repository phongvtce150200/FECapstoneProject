/* eslint-disable prettier/prettier */
import axios from "axios";
export const HTTP = axios.create({
  baseURL: 'https://localhost:5001/api/',
  headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})
