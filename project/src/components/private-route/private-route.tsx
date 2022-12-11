import { Navigate } from 'react-router-dom';
import { AuthStatus } from '../../const';

type PrivateRouteProps = {
  authorizationStatus: string;
  children: JSX.Element;
}

function PrivateRoute({authorizationStatus, children}: PrivateRouteProps): JSX.Element {

  return (
    authorizationStatus === AuthStatus.Auth ? children : <Navigate to='/login' />
  );
}

export { AuthStatus, PrivateRoute };
