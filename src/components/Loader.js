import PuffLoader from 'react-spinners/PuffLoader';

function Loader({ loading }) {
  return (
    <>
      {loading && (
        <PuffLoader
          color={'#F6F7FB'}
          loading={loading}
          size={60}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </>
  );
}
export default Loader;