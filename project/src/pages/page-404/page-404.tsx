import React from 'react';
import { Link } from 'react-router-dom';

function Page404(): JSX.Element {
  return (
    <React.Fragment>
      <h1>404 Not Found</h1>
      <Link to='/'>Вернуться на главную</Link>
    </React.Fragment>
  );
}

export default Page404;
