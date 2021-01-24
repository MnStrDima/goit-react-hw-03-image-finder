import styles from './Button.module.css';

export default function Button({ onClick }) {
  return (
    <button
      type="button"
      className="Button"
      onClick={() => {
        onClick();
      }}
    >
      Load more...
    </button>
  );
}
// window.scrollTo({
//   top: document.documentElement.scrollHeight,
//   behavior: 'smooth',
// });
