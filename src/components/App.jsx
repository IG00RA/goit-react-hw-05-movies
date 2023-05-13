import { NavLink, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import MoviesDetails from '../pages/MovieDetails/MovieDetails';
import Movies from '../pages/Movies/Movies';
import { Container, Header, Logo, Link } from './App.styled';
import NotFound from 'pages/NotFound/NotFound';
import { Review } from '../components/MovieReview/MovieReview';
import { Cast } from '../components/MovieCast/MovieCast';
import { useEffect, useState } from 'react';

export const App = () => {
  const [error, setError] = useState(false);
  useEffect(() => {
    setError(false);
  }, []);

  return (
    <Container>
      <Header>
        <Logo>
          <span role="img" aria-label="movie icon">
            🎬
          </span>{' '}
          Movie Search Platform
        </Logo>
        <nav>
          <Link to="/" end>
            Home
          </Link>
          <Link to="/movies">Movies</Link>
        </nav>
      </Header>
      {error && (
        <div>
          <div style={{ color: 'red' }}>
            Sorry, we cannot load this movie, please choose another one:
          </div>
          <br />
          <NavLink to="/" end>
            Go to Home
          </NavLink>{' '}
          <p>or</p> <NavLink to="/movies">find more Movies</NavLink>
          <br />
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home changeError={setError} />} />
        <Route path="/movies" element={<Movies changeError={setError} />} />
        <Route
          path="/movies/:id"
          element={<MoviesDetails changeError={setError} />}
        >
          <Route path="cast" element={<Cast />} />
          <Route path="review" element={<Review />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Container>
  );
};
