import { getMovieById } from 'API';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const Cast = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    fetchDetalis(id);
  }, [id]);

  const fetchDetalis = async id => {
    try {
      const getDetalis = await getMovieById(id);
      setMovie(getDetalis.data.credits.cast);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  if (movie.length !== 0) {
    return (
      <ul>
        {movie.map(mov => (
          <li key={mov.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${mov.profile_path}`}
              alt={`${mov.name}`}
            />
            <h2>{mov.name}</h2>
            <p>Character: {mov.character}</p>
          </li>
        ))}
      </ul>
    );
  }
};
