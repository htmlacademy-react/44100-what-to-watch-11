import Main from '../../pages/main/main';
import SignIn from '../../pages/sign-in/sign-in';
import MyList from '../../pages/my-list/my-list';
import Film from '../../pages/film-page/film-page';
import AddReview from '../../pages/add-review/add-review';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Player from '../../pages/player/player';
import Page404 from '../../pages/page-404/page-404';
import { AuthStatus, PrivateRoute } from '../private-route/private-route';
import { useAppSelector } from '../../hooks/useAppSelector';

function App(): JSX.Element {

  const { promoFilm,films } = useAppSelector((state) => state);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main promoFilm={promoFilm} />} />
        <Route path='login' element={<SignIn />} />
        <Route path='mylist' element={<PrivateRoute authStatus={AuthStatus.Auth}><MyList filmsList={films}/></PrivateRoute>} />
        <Route path='films/:id/'>
          <Route index element={<Film film={films[0]} />} />
          <Route path='review' element={<AddReview filmsList={films}/>} />
        </Route>
        <Route path='/player/:id' element={<Player filmsList={films}/>} />
        <Route path='*' element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
