import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AddReviewComponent from '../../components/add-review-component/add-review-component';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getFilmsList } from '../../store/data/data-selector';

function AddReview(): JSX.Element {
  const params = useParams();
  const filmsList = useAppSelector(getFilmsList);
  const selectedFilm = filmsList.find((film) => film.id === Number(params.id));

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={selectedFilm?.backgroundImage} alt={selectedFilm?.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Link to={'/'} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a href="film-page.html" className="breadcrumbs__link">{selectedFilm?.name}</a>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link">Sign out</a>
            </li>
          </ul>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={selectedFilm?.posterImage} alt={selectedFilm?.name} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <AddReviewComponent />
      </div>

    </section>
  );
}

export default AddReview;
