import PuffLoader from 'react-spinners/PuffLoader';

function Loader({ loading }) {
  return (
    <div>
      {loading && (
        <PuffLoader
          color={'#000000'}
          loading={loading}
          size={60}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </div>
  );
}
export default Loader;