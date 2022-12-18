import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { APIRout, CommentLength } from '../../const';
import { useAppSelector } from '../../hooks/useAppSelector';
import { store } from '../../store';
import { newCommentAction } from '../../store/api-actions';
import { getFilm } from '../../store/data/data-selector';
import { setReviewFormDisabled } from '../../store/utils/utils';
import { getFormStatus } from '../../store/utils/utils-selector';
import { ReviewFormData } from '../../types/types';

function AddReviewComponent(): JSX.Element {
  const navigate = useNavigate();

  const film = useAppSelector(getFilm);

  const [formData, setFormData] = useState<ReviewFormData>({
    rating: 0,
    comment: '',
  });

  const [ratingValue, setRatingValue] = useState<number>(0);

  const isReviewFormDisabled = useAppSelector(getFormStatus);

  const [isReviewFormValid, setReviewFormValid] = useState<boolean>(false);

  const checkReviewFormValid = () => formData.rating !== null && formData.comment.length >= CommentLength.min && formData.comment.length <= CommentLength.max;

  const handleRatingValueChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRatingValue(Number(evt.target.value));
    setReviewFormValid(checkReviewFormValid());
    setFormData({ ...formData, rating: Number(evt.target.value) });
  };

  const handleTextChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    if (evt.target.value) {
      setReviewFormValid(checkReviewFormValid());
      setFormData({ ...formData, comment: evt.target.value });
    } else {
      setFormData({ ...formData, comment: '' });
    }
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    store.dispatch(setReviewFormDisabled(true));

    if (formData.rating && formData.comment && film) {
      const [comment, rating] = [formData.comment, formData.rating];
      store.dispatch(newCommentAction([film.id, { comment, rating }]));
      navigate(`${APIRout.Films}/${film.id.toString()}`);
    }
  };

  return (
    <form action="#" className="add-review__form" onSubmit={handleFormSubmit}>
      <div className="rating">
        <div className="rating__stars">
          <input className="rating__input" id="star-10" type="radio" name="rating" value="10" checked={ratingValue === 10} onChange={handleRatingValueChange} disabled={isReviewFormDisabled} />
          <label className="rating__label" htmlFor="star-10">Rating 10</label>

          <input className="rating__input" id="star-9" type="radio" name="rating" value="9" checked={ratingValue === 9} onChange={handleRatingValueChange} disabled={isReviewFormDisabled} />
          <label className="rating__label" htmlFor="star-9">Rating 9</label>

          <input className="rating__input" id="star-8" type="radio" name="rating" value="8" checked={ratingValue === 8} onChange={handleRatingValueChange} disabled={isReviewFormDisabled} />
          <label className="rating__label" htmlFor="star-8">Rating 8</label>

          <input className="rating__input" id="star-7" type="radio" name="rating" value="7" checked={ratingValue === 7} onChange={handleRatingValueChange} disabled={isReviewFormDisabled} />
          <label className="rating__label" htmlFor="star-7">Rating 7</label>

          <input className="rating__input" id="star-6" type="radio" name="rating" value="6" checked={ratingValue === 6} onChange={handleRatingValueChange} disabled={isReviewFormDisabled} />
          <label className="rating__label" htmlFor="star-6">Rating 6</label>

          <input className="rating__input" id="star-5" type="radio" name="rating" value="5" checked={ratingValue === 5} onChange={handleRatingValueChange} disabled={isReviewFormDisabled} />
          <label className="rating__label" htmlFor="star-5">Rating 5</label>

          <input className="rating__input" id="star-4" type="radio" name="rating" value="4" checked={ratingValue === 4} onChange={handleRatingValueChange} disabled={isReviewFormDisabled} />
          <label className="rating__label" htmlFor="star-4">Rating 4</label>

          <input className="rating__input" id="star-3" type="radio" name="rating" value="3" checked={ratingValue === 3} onChange={handleRatingValueChange} disabled={isReviewFormDisabled} />
          <label className="rating__label" htmlFor="star-3">Rating 3</label>

          <input className="rating__input" id="star-2" type="radio" name="rating" value="2" checked={ratingValue === 2} onChange={handleRatingValueChange} disabled={isReviewFormDisabled} />
          <label className="rating__label" htmlFor="star-2">Rating 2</label>

          <input className="rating__input" id="star-1" type="radio" name="rating" value="1" checked={ratingValue === 1} onChange={handleRatingValueChange} disabled={isReviewFormDisabled} />
          <label className="rating__label" htmlFor="star-1">Rating 1</label>
        </div>
      </div>

      <div className="add-review__text">
        <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" onChange={handleTextChange} value={formData.comment} disabled={isReviewFormDisabled}></textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled={!isReviewFormValid || isReviewFormDisabled}>Post</button>
        </div>

      </div>
    </form>
  );
}

export default AddReviewComponent;
