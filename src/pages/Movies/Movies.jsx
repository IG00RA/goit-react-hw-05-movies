import { getMovieByQuery } from 'API';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

const Movies = () => {
  const [movie, setMovie] = useState([]);
  const [isSearch, setIsSearch] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const movieQuery = searchParams.get('query') ?? '';
  const location = useLocation();

  useEffect(() => {
    if (movieQuery && isSearch) {
      fetchDetalis(movieQuery);
    }
  }, [movieQuery, isSearch]);

  const fetchDetalis = async input => {
    try {
      const getDetalis = await getMovieByQuery(input);
      setMovie(getDetalis.data.results);
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
        }}
      >
        <input
          name="search"
          placeholder="Please enter film name"
          value={movieQuery}
          onChange={e => updateQueryString(e)}
        />
        <button type="submit">Search</button>
      </form>
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
