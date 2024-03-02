import axios from 'axios';

const accessKey = 'zY3ucKRYgbb-SuVMAOyph5NzqnlpY5nMPvfBAl01IGE' 
axios.defaults.baseURL = 'https://api.unsplash.com';

export const fetchImages = async (searchQuery, page = 1) => {

  const params = {
    query: searchQuery,
    page,
    per_page: 10,
    client_id: accessKey,
}
try {
    const response = await axios.get(`search/photos/?${new URLSearchParams(params).toString()}`);
    return response.data;
}
catch (error) {
    console.log(error.message);
}
}
