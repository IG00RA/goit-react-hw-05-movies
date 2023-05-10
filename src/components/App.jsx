import { BrowserRouter } from 'react-router-dom';

export const App = () => {
  return (
    <BrowserRouter basename="/goit-react-hw-05-movies">
      <App />
    </BrowserRouter>
  );
};
