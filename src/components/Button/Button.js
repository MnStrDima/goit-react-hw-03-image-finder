import PropTypes from 'prop-types';
import styles from './Button.module.css';

export default function Button({ onClick }) {
  return (
    <button
      type="button"
      className={styles.Button}
      onClick={() => {
        onClick();
      }}
    >
      Load more...
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
