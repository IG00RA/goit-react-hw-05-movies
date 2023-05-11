import { getMovieTrend } from '../../API';

import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

const Home = () => {
  const [trend, setTrend] = useState([]);
  useEffect(() => {
    fetchTrend();
  }, []);

  const fetchTrend = async () => {
    try {
      const getTrend = await getMovieTrend();
      setTrend(getTrend);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  return (
    <main>
      <h1>Trending Today</h1>
      <ul>
        {trend.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} alt={movie.title ?? movie.name}>
              {movie.original_title ?? movie.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
