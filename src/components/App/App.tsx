import { useState } from 'react';
import css from './App.module.css';
import NoteList from '../NoteList/NoteList';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '../../services/noteService';
import NoteModal from '../NoteModal/NoteModal';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

function App() {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 500);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data, error, isLoading, isFetching, isSuccess } = useQuery({
    queryKey: ['notes', debouncedQuery, page],
    queryFn: () => fetchNotes({ page, search: debouncedQuery }),

    placeholderData: (previousData) => previousData,
    staleTime: 5000,
  });

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={query} onChange={handleQueryChange} />

          {isSuccess && data?.totalPages > 1 && (
            <Pagination
              totalPages={data.totalPages}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          )}

          <button className={css.button} onClick={openModal}>
            Create note +
          </button>
        </header>
        {(isLoading || isFetching) && <div>Завантаження...</div>}
        {error && <ErrorMessage message='Помилка завантаження даних' />}{' '}
        {!isLoading && !error && data?.notes.length === 0 && (
          <div>Нотаток не знайдено</div>
        )}
        {data?.notes && <NoteList notes={data.notes} />}
      </div>

      {isModalOpen && <NoteModal onClose={closeModal} />}
    </>
  );
}

export default App;
