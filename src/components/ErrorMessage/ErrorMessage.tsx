import css from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <>
      <p className={css.error_text}>
        <hr />

        {message || 'There was an error, please try again...'}
      </p>
    </>
  );
}
