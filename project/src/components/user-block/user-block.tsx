import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { AuthStatus } from '../../const';
import { logoutAction } from '../../store/api-actions';
import { store } from '../../store';

function UserBlock(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const loggedIn = authorizationStatus === AuthStatus.Auth;

  return (
    <ul className='user-block'>
      {loggedIn ?
        <>
          <li className='user-block__item'>
            <div className='user-block__avatar'>
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

export default UserBlock;
