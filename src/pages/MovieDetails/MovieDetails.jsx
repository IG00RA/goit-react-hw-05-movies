import { getMovieById } from 'API';
import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';

const MoviesDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const location = useLocation();
  useEffect(() => {
    fetchDetalis(id);
  }, [id]);

  const fetchDetalis = async id => {
    try {
      const getDetalis = await getMovieById(id);
      setMovie(getDetalis.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  if (movie.length !== 0) {
    const genres = movie.genres.map(genre => genre.name).join(', ');

    return (
      <main>
        <Link to={location.state?.from ?? '/'}>↤ Go back</Link>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={`${movie.original_title}`}
        />
        <h1> {movie.original_title}</h1>
        <p>User score: {Math.floor(movie.vote_average * 10)}% </p>
        <h2>Overview</h2>
        <p>{movie.overview}</p>
        <h2>Genres</h2>
        <p>{genres}</p>
        <p>Additional information</p>
        <ul>
          <li>
            <Link to="review">Review</Link>
          </li>
          <li>
            <Link to="cast">Cast</Link>
          </li>
        </ul>
        <Outlet />
      </main>
    );
  }
};

export default MoviesDetails;
