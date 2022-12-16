import { useRef, useEffect, useState } from 'react';
import { VIDEOPLAYER_TIMEOUT } from '../../const';
import { Film } from '../../types/types';

type VideoPlayerProps = {
  film: Film;
  width: string;
  height: string;
}

function VideoPlayer({film, width, height}: VideoPlayerProps): JSX.Element {

  const ref = useRef<HTMLVideoElement>(null);
  const [, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    if (ref.current === null) {
      return;
    }

    ref.current.addEventListener('loadeddata', () => {
      if (isMounted) {
        setIsLoading(false);
      }
    });

    setTimeout(() => {
      if (ref.current) {
        ref.current.play();
      }
    }, VIDEOPLAYER_TIMEOUT);

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <video
      ref={ref}
      src={film.previewVideoLink}
      poster={film.posterImage}
      width={width}
      height={height}
      muted
    >
    </video>
  );
}

export default VideoPlayer;
