import axios from 'axios';
import {API_URL} from '../config';

export const roomReserve = async roomData =>{
    const response = await axios.post(`${API_URL}/reservation/`,roomData);
    return response.data;
}