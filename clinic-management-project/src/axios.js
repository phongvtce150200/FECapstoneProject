/* eslint-disable prettier/prettier */
import axios from "axios";
axios.defaults.baseURL = "https://localhost:5001/api/";
axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token")
