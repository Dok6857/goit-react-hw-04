import axios from 'axios';

const accessKey = 'zY3ucKRYgbb-SuVMAOyph5NzqnlpY5nMPvfBAl01IGE' 

export const fetchImages = async (searchQuery, page = 1) => {
  axios.defaults.baseURL = 'https://api.unsplash.com';

  const response = await axios.get('/search/photos', {
    params: {
      query: searchQuery,
      client_id: accessKey,
      hitsPerPage: 10,
      page,
    },
  });

  if (response.data && Array.isArray(response.data.hits)) {
    return response.data.results;
  } else {
    throw new Error('Unexpected response structure');
  }
};
