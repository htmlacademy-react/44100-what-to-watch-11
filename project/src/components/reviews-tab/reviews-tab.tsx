import dayjs from 'dayjs';
import { Reviews } from '../../types/types';

type ReviewsTabProps = {
  reviews: Reviews;
}

function ReviewsTab({ reviews }: ReviewsTabProps): JSX.Element {
  return (
    <>
      {reviews.map((review) => (
        <div className="film-card__reviews film-card__row" key={review.id}>
          <div className="film-card__reviews-col">
            <div className="review">
              <blockquote className="review__quote">
                <p className="review__text">{review.comment}</p>

                <footer className="review__details">
                  <cite className="review__author">{review.user.name}</cite>
                  <time className="review__date" dateTime={review.date}>{dayjs(review.date).format('MMMM DD, YYYY')}</time>
                </footer>
              </blockquote>

              <div className="review__rating">{review.rating}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ReviewsTab;
