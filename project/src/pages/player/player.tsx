import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/spinner/spinner';
import { APIRout } from '../../const';
import { useAppSelector } from '../../hooks/useAppSelector';
import { store } from '../../store';
import { fetchFilmAction } from '../../store/api-actions';
import { getFilm, getFilmLoadingStatus } from '../../store/data/data-selector';
import { formatTimeForPlayer } from '../../utils';
import Page404 from '../page-404/page-404';

function Player(): JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isFullscreen, setFullscreen] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [durationTime, setDurationTime] = useState(0);

  const progressValue = `${(currentTime / durationTime) * 100}%`;
  const timeLeft = durationTime - currentTime;

  useEffect(() => {

    let isVideoPlayerMounted = true;

    if (id && isVideoPlayerMounted) {
      store.dispatch(fetchFilmAction(id));
    }

    return () => {
      isVideoPlayerMounted = false;
    };
  }, [id]);

  useEffect(() => {

    let isVideoPlayerMounted = true;
    const videoRefCurrentProp = videoRef.current;

    if (videoRef.current === null) {
      return;
    }

    const handleDurationTimeWatch = () => {
      if (videoRefCurrentProp && isVideoPlayerMounted) {
        setDurationTime(Math.trunc(videoRefCurrentProp.duration));
      }
    };

    const handleCurrentTimeWatch = () => {
      if (videoRefCurrentProp && isVideoPlayerMounted) {
        setCurrentTime(Math.trunc(videoRefCurrentProp.currentTime));
      }
    };

    videoRefCurrentProp?.addEventListener('loadeddata', handleDurationTimeWatch);

    videoRefCurrentProp?.addEventListener('timeupdate', handleCurrentTimeWatch);

    return () => {
      isVideoPlayerMounted = false;
      videoRefCurrentProp?.removeEventListener('loadeddata', handleDurationTimeWatch);
      videoRefCurrentProp?.removeEventListener('timeupdate', handleCurrentTimeWatch);
    };
  });

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    if (isFullscreen) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }

    return () => setFullscreen(false);
  }, [isFullscreen]);

  const film = useAppSelector(getFilm);
  const isFilmDataLoading = useAppSelector(getFilmLoadingStatus);


  if (film === undefined) {
    return <Page404 />;
  }

  const handleExitButtonClick = () => {
    navigate(`${APIRout.Films}/${film.id.toString()}`);
    setIsPlaying(false);
  };

  const handlePauseButtonClick = () => {
    if (videoRef.current === null) {
      return;
    }
    videoRef.current.pause();
    setIsPlaying(false);
  };

  const handlePlayButtonClick = () => {
    if (videoRef.current === null) {
      return;
    }
    videoRef.current.play();
    setIsPlaying(true);
  };

  if (isFilmDataLoading) {
    return (
      <Spinner />
    );
  }

  return (
    <div className="player">
      <video
        src={film.videoLink}
        className="player__video"
        poster={film.backgroundImage}
        ref={videoRef} autoPlay
      >
      </video>

      <button
        type="button"
        className="player__exit"
        onClick={handleExitButtonClick}
      >
        Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress
              className="player__progress"
              value={currentTime}
              max={durationTime}
            >
            </progress>
            <div className="player__toggler" style={{ left: progressValue }}>Toggler</div>
          </div>
          <div className="player__time-value">
            {formatTimeForPlayer(timeLeft)}
          </div>
        </div>

        <div className="player__controls-row">

          {isPlaying ? (
            <button type="button" className="player__play" onClick={handlePauseButtonClick}>
              <svg viewBox="0 0 14 21" width="14" height="21">
                <use xlinkHref="#pause"></use>
              </svg>
              <span>Pause</span>
            </button>) : (
            <button type="button" className="player__play" onClick={handlePlayButtonClick}>
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>
              <span>Play</span>
            </button>)}

          <div className="player__name">{film.name}</div>

          <button
            type="button"
            className="player__full-screen"
            onClick={() => setFullscreen(true)}
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Player;
