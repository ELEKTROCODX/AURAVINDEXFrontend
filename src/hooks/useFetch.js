import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  const fetchData = async (endpoint,options ={})=>{
    setLoading(true);
    setError(null);
    try{
        const response = await axios({
            url: `${API_URL}${endpoint}`,
            ...options,
        });
        setData(response.data.data);
        setPagination(response.data.pagination);
        return response.data;
    }catch(err){
        if (err.response) {
            console.error('Error del servidor:', err.response.data);
            console.error('Código de estado:', err.response.status);
        } else if (err.request) {
            console.error('Sin respuesta del servidor:', err.request);
        } else {
            console.error('Error desconocido:', err.message);
        }
        throw err;
    }finally{
        setLoading(false);
    }
  };

  return { data, loading, error, fetchData, pagination };
};

export default useFetch;