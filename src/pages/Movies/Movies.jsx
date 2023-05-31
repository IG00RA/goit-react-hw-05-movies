import { getMovieByQuery } from 'API';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

const Movies = ({ changeError }) => {
  const [movie, setMovie] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const movieQuery = searchParams.get('query') ?? '';
  const location = useLocation();
  const [isLoad, setIsLoad] = useState(false);
  const [firstLoad] = useState(1);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (firstLoad === 1) {
      fetchDetalis(movieQuery);
    }
  }, [firstLoad, movieQuery]);

  useEffect(() => {
    if (movieQuery.length !== 0) {
      setInput(movieQuery);
    }
  }, [movieQuery]);

  const fetchDetalis = async input => {
    try {
      if (input.length > 0) {
        const getDetalis = await getMovieByQuery(input);
        setMovie(getDetalis.data.results);
        if (getDetalis.data.total_results === 0) {
          setIsLoad(true);
        } else {
          setIsLoad(false);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const updateQueryString = e => {
    if (e.target.elements.search.value === '') {
      return setSearchParams({});
    }
    setSearchParams({ query: e.target.elements.search.value });
    // e.target.elements.search.value = movieQuery;
  };

  return (
    <main>
      <form
        onSubmit={e => {
          e.preventDefault();
          changeError(false);
          setIsLoad(false);
          updateQueryString(e);
        }}
      >
        <input
          autoFocus
          name="search"
          placeholder="Please enter film name"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {isLoad && <p style={{ color: 'red' }}>Enter another query</p>}
      <ul>
        {movie.map(movie => (
          <li key={movie.id}>
            <Link
              state={{ from: location }}
              to={`/movies/${movie.id}`}
              alt={movie.title ?? movie.name}
            >
              {movie.original_title ?? movie.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Movies;
