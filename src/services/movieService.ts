import axios from "axios";
import type { Movie, MoviesResponse }  from '../types/movie';


const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
console.log("TOKEN:", TOKEN);
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (query: string): Promise<Movie[]> => {
    const response =
    await axios.get<MoviesResponse>(`${BASE_URL}/search/movie`, {
      params: {
        query,
      },
      headers: {
  Authorization: `Bearer ${TOKEN}`,
}
    });

  return response.data.results;
};