import { getMovieById } from 'API';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const Review = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    fetchDetalis(id);
  }, [id]);

  const fetchDetalis = async id => {
    try {
      const getDetalis = await getMovieById(id);
      setMovie(getDetalis.data.reviews.results);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  if (movie.length === 0) {
    return "We don't have any reviews for this movie";
  } else {
    return movie.map(mov => (
      <div>
        <h2>Author: {mov.author}</h2>
        <p>{mov.content}</p>
      </div>
    ));
  }
};
