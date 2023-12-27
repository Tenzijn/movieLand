import { useEffect, useState } from 'react';
import './styles/App.css';
import SearchIcon from './assets/search.svg';
import MovieCard from './components/MovieCard';

const API_URL = `http://www.omdbapi.com/?i=tt3896198&apikey=${
  import.meta.env.VITE_API_KEY
}`;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies('superman');
  }, []);

  return (
    <div className='app'>
      <h1>MovieLand</h1>
      <div className='search'>
        <input
          placeholder='Search for a movie...'
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <img
          src={SearchIcon}
          alt='Search Icon'
          onClick={() => {
            searchMovies(searchTerm);
          }}
        />
      </div>
      <div className='container'>
        {movies?.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)
        ) : (
          <div className='empty'>
            <h1> No movies found </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
