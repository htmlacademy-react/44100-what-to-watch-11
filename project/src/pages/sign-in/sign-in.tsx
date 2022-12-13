import { FormEvent, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthStatus } from '../../const';
import { useAppSelector } from '../../hooks/useAppSelector';
import { store } from '../../store';
import { loginAction } from '../../store/api-actions';
import { getAuthStatus } from '../../store/user/user-selector';
import { AuthData } from '../../types/types';

function SignIn(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const authStatus = useAppSelector(getAuthStatus);
  const navigate = useNavigate();

  const pattern = '[A-Za-z]+[0-9]|[0-9]+[A-Za-z]';

  const onSubmit = (authData: AuthData) => {
    store.dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null && passwordRef.current.value !== '') {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  useEffect(() => {
    if (authStatus === AuthStatus.Auth) {
      navigate('/');
    }
  }, [authStatus, navigate]);

  return (
    <div className='user-page'>
      <header className='page-header user-page__head'>
        <div className='logo'>
          <Link to='/' className='logo__link'>
            <span className='logo__letter logo__letter--1'>W</span>
            <span className='logo__letter logo__letter--2'>T</span>
            <span className='logo__letter logo__letter--3'>W</span>
          </Link>
        </div>

        <h1 className='page-title user-page__title'>Sign in</h1>
      </header>

      <div className='sign-in user-page__content'>
        <form
          action='#'
          className='sign-in__form'
          onSubmit={handleSubmit}
        >
          <div className='sign-in__fields'>
            <div className='sign-in__field'>
              <input
                ref={loginRef}
                className='sign-in__input'
                type='email'
                placeholder='Email address'
                name='user-email'
                id='user-email'
              />
              <label className='sign-in__label visually-hidden' htmlFor='user-email'>Email address</label>
            </div>
            <div className='sign-in__field'>
              <input
                ref={passwordRef}
                className='sign-in__input'
                type='password'
                placeholder='Password'
                name='user-password'
                id='user-password'
                pattern={pattern}
                title='Валидный пароль должен состоять минимум из одной буквы и цифры и в нём не должно быть пробелов.'
              />
              <label className='sign-in__label visually-hidden' htmlFor='user-password'>Password</label>
            </div>
          </div>
          <div className='sign-in__submit'>
            <button
              className='sign-in__btn'
              type='submit'
            >
              Sign in
            </button>
          </div>
        </form>
      </div>

      <footer className='page-footer'>
        <div className='logo'>
          <Link to='/' className='logo__link logo__link--light'>
            <span className='logo__letter logo__letter--1'>W</span>
            <span className='logo__letter logo__letter--2'>T</span>
            <span className='logo__letter logo__letter--3'>W</span>
          </Link>
        </div>

        <div className='copyright'>
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default SignIn;
