
import "./App.module.css";


import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

import { Toaster, toast } from "react-hot-toast";
import { useState } from "react";


import type { Movie } from "../../types/movie.ts";
import { fetchMovies } from "../../services/movieService.ts";

export default function App() {

const [movies, setMovies] = useState<Movie[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);
const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);



  async function handleSearch(query: string) {
    setMovies([]);
  setLoading(true);
  setError(false);

  try {
    const fetchedMovies = await fetchMovies(query);
    if (fetchedMovies.length === 0) {
      toast.error("No movies found for your request.");
      return;
    }

    setMovies(fetchedMovies);
  } catch {
    console.error(error);
    setError(true);
  } finally {
    setLoading(false);
  }
}
  return (
     <>
      <SearchBar onSubmit={handleSearch} />
      {movies.length > 0 && <MovieGrid  movies={movies} onSelect={setSelectedMovie} />}
     {loading && <Loader />}
     {error && <ErrorMessage />}
     {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
      <Toaster />
    </>
  );
}

