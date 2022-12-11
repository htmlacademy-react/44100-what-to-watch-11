import { ColorRing } from 'react-loader-spinner';

function Spinner(): JSX.Element {
  return (
    <ColorRing
      height='160'
      width='160'
      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      ariaLabel='loading'
      visible
      wrapperClass={undefined}
      wrapperStyle={undefined}
    />
  );
}

export default Spinner;
