import PuffLoader from 'react-spinners/PuffLoader';

function Loader({ loading }) {
  return (
    <div>
      {loading && (
        <PuffLoader
          color={'#F6F7FB'}
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