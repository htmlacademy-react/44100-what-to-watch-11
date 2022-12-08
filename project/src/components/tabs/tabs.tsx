import { useState } from 'react';
import { Film, Reviews } from '../../types/types';
import { TabValue } from '../../const';
import OverviewTab from '../overview-tab/overview-tab';
import DetailsTab from '../details-tab/details-tab';
import ReviewsTab from '../reviews-tab/reviews-tab';

type TabsProps = {
  film: Film;
  reviews: Reviews;
}

function Tabs({ film, reviews }: TabsProps): JSX.Element {
  const [selectedTab, setSelectedTab] = useState<string | null>(TabValue.Overview);

  const renderSelectedTab = () => {
    switch (selectedTab) {
      case TabValue.Overview:
        return <OverviewTab film={film} />;
      case TabValue.Details:
        return <DetailsTab film={film} />;
      case TabValue.Reviews:
        return <ReviewsTab reviews={reviews}/>;
    }
  };

  return (
    <>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className={`film-nav__item ${selectedTab === TabValue.Overview ? 'film-nav__item--active' : ''}`}>
            <a
              className="film-nav__link"
              onClick={() => setSelectedTab(TabValue.Overview)}
            >
              Overview
            </a>
          </li>
          <li className={`film-nav__item ${selectedTab === TabValue.Details ? 'film-nav__item--active' : ''}`}>
            <a
              className="film-nav__link"
              onClick={() => setSelectedTab(TabValue.Details)}
            >
              Details
            </a>
          </li>
          <li className={`film-nav__item ${selectedTab === TabValue.Reviews ? 'film-nav__item--active' : ''}`}>
            <a
              className="film-nav__link"
              onClick={() => setSelectedTab(TabValue.Reviews)}
            >
              Reviews
            </a>
          </li>
        </ul>
      </nav>

      {renderSelectedTab()}
    </>
  );
}

export default Tabs;
