import Main from '../../pages/main/main';
import SignIn from '../../pages/sign-in/sign-in';
import MyList from '../../pages/my-list/my-list';
import Film from '../../pages/film-page/film-page';
import AddReview from '../../pages/add-review/add-review';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Player from '../../pages/player/player';
import Page404 from '../../pages/page-404/page-404';
import { PrivateRoute } from '../private-route/private-route';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getAuthStatus } from '../../store/user/user-selector';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthStatus);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='login' element={<SignIn />} />
        <Route path='mylist' element={<PrivateRoute authorizationStatus={authorizationStatus}><MyList /></PrivateRoute>} />
        <Route path='films/:id/'>
          <Route index element={<Film />} />
          <Route path='review' element={<AddReview />} />
        </Route>
        <Route path='/player/:id' element={<Player />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
