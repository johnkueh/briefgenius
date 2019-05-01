import PropTypes from 'prop-types';

const PageLoading = ({ title }) => (
  <>
    <div>{title}</div>
    <style jsx>{`
      div {
        height: 100vh;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `}</style>
  </>
);

export default PageLoading;

PageLoading.propTypes = {
  title: PropTypes.string
};

PageLoading.defaultProps = {
  title: 'Loading...'
};
