import { getMovieById } from 'API';
import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { Container, PosterImg } from './MovieDetails.styled';

const MoviesDetails = ({ changeError }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const location = useLocation();
  const backLocation = useRef(location.state?.from ?? '/');

  useEffect(() => {
    const fetchDetalis = async id => {
      try {
        const getDetalis = await getMovieById(id);
        setMovie(getDetalis.data);
      } catch (error) {
        changeError(error);
      } finally {
      }
    };
    fetchDetalis(id);
  }, [id, changeError]);

  if (movie.length !== 0) {
    const genres = movie.genres.map(genre => genre.name).join(', ');

    return (
      <Container>
        <Link to={backLocation.current}>↤ Go back</Link>
        <PosterImg
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
          <li key={'reviev'}>
            <Link to="review">Review</Link>
          </li>
          <li key={'cast'}>
            <Link to="cast">Cast</Link>
          </li>
        </ul>
        <Outlet />
      </Container>
    );
  }
};

export default MoviesDetails;
