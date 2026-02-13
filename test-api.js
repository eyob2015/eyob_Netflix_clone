// Test script to verify API configuration
const axios = require('axios');
require('dotenv').config();

const API_BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = process.env.REACT_APP_API_KEY;

console.log('API Key:', API_KEY ? `${API_KEY.substring(0, 10)}...` : 'NOT SET');
console.log('Base URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

const testEndpoint = `/trending/all/week?api_key=${API_KEY}&language=en-US`;
console.log('Test endpoint:', testEndpoint);

api.get(testEndpoint)
  .then(response => {
    console.log('✅ API Call Successful');
    console.log('Response structure:', {
      page: response.data.page,
      total_results: response.data.total_results,
      results_count: response.data.results?.length || 0,
      first_item: response.data.results?.[0] ? {
        id: response.data.results[0].id,
        title: response.data.results[0].title || response.data.results[0].name,
        has_poster_path: !!response.data.results[0].poster_path,
        has_backdrop_path: !!response.data.results[0].backdrop_path,
      } : 'No results'
    });
  })
  .catch(error => {
    console.error('❌ API Call Failed');
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  });
