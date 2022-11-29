import Main from '../../pages/main/main';
import SignIn from '../../pages/sign-in/sign-in';
import MyList from '../../pages/my-list/my-list';
import Film from '../../pages/film/film';
import AddReview from '../../pages/add-review/add-review';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Player from '../../pages/player/player';
import Page404 from '../../pages/page-404/page-404';
import { AuthStatus, PrivateRoute } from '../private-route/private-route';

type FilmData = {
  title: string;
  genre: string;
  releaseDate: number;
}

function App(props: FilmData): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main {...props} />} />
        <Route path='login' element={<SignIn />} />
        <Route path='mylist' element={<PrivateRoute authStatus={AuthStatus.NoAuth}><MyList /></PrivateRoute>} />
        <Route path='films/:id/'>
          <Route index element={<Film />} />
          <Route path='review' element={<AddReview />} />
        </Route>
        <Route path='player/:id' element={<Player />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
