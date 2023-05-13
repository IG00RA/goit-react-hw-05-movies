import { getMovieByQuery } from 'API';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

const Movies = ({ changeError }) => {
  const [movie, setMovie] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const movieQuery = searchParams.get('query') ?? '';
  const location = useLocation();
  const [isSearch, setIsSearch] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    if (isSearch) {
      fetchDetalis(movieQuery);
    }
  }, [isSearch, movieQuery]);

  const fetchDetalis = async input => {
    try {
      if (input.length > 0) {
        const getDetalis = await getMovieByQuery(input);
        setMovie(getDetalis.data.results);
        if (getDetalis.data.total_results === 0) {
          setIsLoad(true);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSearch(false);
    }
  };

  const updateQueryString = e => {
    if (e.target.value === '') {
      return setSearchParams({});
    }
    setSearchParams({ query: e.target.value });
  };

  return (
    <main>
      <form
        onSubmit={e => {
          e.preventDefault();
          setIsSearch(true);
          changeError(false);
          setIsLoad(false);
        }}
      >
        <input
          autoFocus
          name="search"
          placeholder="Please enter film name"
          value={movieQuery}
          onChange={e => updateQueryString(e)}
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
