import { render, screen } from '@testing-library/react';
import { makeFakeReview } from '../../mocks/mocks';
import ReviewsTab from './reviews-tab';

const reviews = [makeFakeReview()];

describe('Component: ReviewsTab', () => {
  it('should render correctly', () => {

    render(
      <ReviewsTab reviews={reviews} />
    );

    const review = reviews[0];
    const textElement = screen.getByText(review.comment);
    const userElement = screen.getByText(review.user.name);
    const ratingElement = screen.getByText(review.rating);

    expect(textElement).toBeInTheDocument();
    expect(userElement).toBeInTheDocument();
    expect(ratingElement).toBeInTheDocument();
  });
});
