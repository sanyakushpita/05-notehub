import { useEffect, useState } from 'react';
import css from './App.module.css';
import NoteList from '../NoteList/NoteList';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '../../services/noteService';
import NoteModal from '../NoteModal/NoteModal';
import SearchBox from '../SearchBox/SearchBox';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Pagination from '../Pagination/Pagination';

function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 400);

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  const [isModal, setIsModal] = useState(false);

  const handleCreateNote = () => {
    setIsModal(true);
  };
  const closeModal = () => {
    setIsModal(false);
  };

  const { data, isError, isLoading, isFetching, isSuccess } = useQuery({
    queryKey: ['notes', debouncedQuery, page],
    queryFn: () => fetchNotes({ page: page, search: debouncedQuery }),
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox
            value={query}
            onChange={(query: string) => setQuery(query)}
          />
          {isSuccess && data.totalPages > 1 && (
            <Pagination
              pageCount={data.totalPages}
              currentPage={page}
              onPageChange={(selectedPage: number) => setPage(selectedPage)}
            />
          )}
          {
            <button onClick={handleCreateNote} className={css.button}>
              Create note +
            </button>
          }
        </header>{' '}
        {isLoading || isFetching}
        {(isError || data?.notes.length === 0) && <ErrorMessage />}
        {data?.notes && <NoteList notes={data.notes} />}
      </div>
      {isModal && <NoteModal onClose={closeModal} />}
    </>
  );
}

export default App;
