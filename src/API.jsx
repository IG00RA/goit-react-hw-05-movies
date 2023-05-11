import axios from 'axios';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const API_KEY = 'aace0f7d10fc9c11cc81c909dc8499b8';

export const getMovieByQuery = async input => {
  const response = await axios.get(
    `/search/movie?api_key=${API_KEY}&query=${input}`
  );
  return response;
};
export const getMovieById = async id => {
  const response = await axios.get(
    `/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits,reviews`
  );
  return response;
};

export const getMovieTrend = async () => {
  const response = await axios.get(`/trending/all/day?api_key=${API_KEY}`);
  return response.data.results;
};
