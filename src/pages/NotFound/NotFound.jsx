import { NavLink } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <div style={{ color: 'red' }}>
        Sorry, we cannot find this page, please choose another one:
      </div>
      <br />
      <NavLink to="/" end>
        Go to Home
      </NavLink>{' '}
      <p>or</p> <NavLink to="/movies">find more Movies</NavLink>
      <br />
    </div>
  );
};

export default NotFound;
