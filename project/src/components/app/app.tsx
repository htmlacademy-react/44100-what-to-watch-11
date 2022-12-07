import Main from '../../pages/main/main';
import SignIn from '../../pages/sign-in/sign-in';
import MyList from '../../pages/my-list/my-list';
import Film from '../../pages/film-page/film-page';
import AddReview from '../../pages/add-review/add-review';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Player from '../../pages/player/player';
import Page404 from '../../pages/page-404/page-404';
import { AuthStatus, PrivateRoute } from '../private-route/private-route';
import { HeadFilm, FilmsList, Reviews } from '../../types/types';

type AppScreenProps = {
  headFilm: HeadFilm;
  filmsList: FilmsList;
  reviews: Reviews;
}

function App({headFilm, filmsList, reviews}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main headFilm={headFilm} filmsList={filmsList} />} />
        <Route path='login' element={<SignIn />} />
        <Route path='mylist' element={<PrivateRoute authStatus={AuthStatus.Auth}><MyList filmsList={filmsList}/></PrivateRoute>} />
        <Route path='films/:id/'>
          <Route index element={<Film film={filmsList[0]} reviews={reviews} />} />
          <Route path='review' element={<AddReview filmsList={filmsList}/>} />
        </Route>
        <Route path='/player/:id' element={<Player filmsList={filmsList}/>} />
        <Route path='*' element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
