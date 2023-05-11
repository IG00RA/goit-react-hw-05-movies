// import { Routes, Route, NavLink } from 'react-router-dom';
// import Home from '../pages/Home/Home';
// import Movies from '../pages/Movies/Movies';
// import ProductDetails from '../pages/ProductDetails/ProductDetails';
// import NotFound from '../pages/NotFound/NotFound';
// import styled from 'styled-components';

// const StyledLink = styled(NavLink)`
//   color: black;

//   &.active {
//     color: orange;
//   }
// `;
// export const App = () => {
//   return (
//     <div>
//       <nav>
//         <StyledLink to="/" end>
//           Home
//         </StyledLink>
//         <StyledLink to="/movies">Products</StyledLink>
//       </nav>

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/movies" element={<Movies />} />
//         <Route path="/products/:id" element={<ProductDetails />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </div>
//   );
// };

import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import MoviesDetails from '../pages/MovieDetails/MovieDetails';
import Movies from '../pages/Movies/Movies';
import { Container, Header, Logo, Link } from './App.styled';
import NotFound from 'pages/NotFound/NotFound';
import { Review } from '../components/MovieReview/MovieReview';
import { Cast } from '../components/MovieCast/MovieCast';

export const App = () => {
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MoviesDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="review" element={<Review />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Container>
  );
};
