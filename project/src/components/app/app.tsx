import Main from '../../pages/main/main';

type FilmData = {
  title: string;
  genre: string;
  releaseDate: number;
}

function App(props: FilmData): JSX.Element {
  return(
    <Main {...props} />
  );
}

export default App;
