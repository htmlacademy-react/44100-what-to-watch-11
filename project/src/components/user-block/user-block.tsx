import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { AuthStatus } from '../../const';
import { logoutAction } from '../../store/api-actions';
import { store } from '../../store';
import { getAuthStatus } from '../../store/user/user-selector';
import { memo } from 'react';

function UserBlock(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthStatus);
  const loggedIn = authorizationStatus === AuthStatus.Auth;
  const navigate = useNavigate();

  return (
    <ul className='user-block'>
      {loggedIn ?
        <>
          <li className='user-block__item'>
            <div
              className='user-block__avatar'
              onClick={() => navigate('/mylist')}
            >
              <img src='img/avatar.jpg' alt='User avatar' width='63' height='63' />
            </div>
          </li>
          <li className='user-block__item'>
            <Link
              to='/'
              className='user-block__link'
              onClick={(evt) => {
                evt.preventDefault();
                store.dispatch(logoutAction());
              }}
            >
              Sign out
            </Link>
          </li>
        </>
        :
        <div className='user-block'>
          <Link to={'/login'} className='user-block__link'>Sign in</Link>
        </div>}
    </ul>
  );
}

export default memo(UserBlock);
