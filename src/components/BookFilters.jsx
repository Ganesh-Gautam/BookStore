import './BookFilters.css'; // 👈 Import CSS
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../store/features/books/booksSlice';

export default function BookFilters({ books }) {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.books.filters);

  const authorOptions = [...new Set(books.flatMap(b => b.volumeInfo?.authors || []))]
    .map(author => ({ label: author, value: author }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const categoryOptions = [...new Set(books.flatMap(b => b.volumeInfo?.categories || []))]
    .map(category => ({ label: category, value: category }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const dateOptions = [...new Set(
    books
      .map(b => b.volumeInfo?.publishedDate?.substring(0, 4))
      .filter(year => year && !isNaN(year))
  )]
    .sort((a, b) => parseInt(a) - parseInt(b))
    .map(year => ({ label: year, value: year }));

  const handleTextChange = (e) => {
    dispatch(setFilters({ title: e.target.value }));
  };

  const handleSelect = (key) => (selected) => {
    dispatch(setFilters({ [key]: selected?.value || '' }));
  };

  const resetFilters = () => {
    dispatch(setFilters({ title: '', author: '', category: '', publishedDate: '' }));
  };

  return (
    <div className="book-filters">
      <input
        type="text"
        placeholder="Search title..."
        value={filters.title}
        onChange={handleTextChange}
        className="filter-input"
      />

      <Select
        options={authorOptions}
        onChange={handleSelect('author')}
        placeholder="Filter by author"
        isClearable
      />

      <Select
        options={categoryOptions}
        onChange={handleSelect('category')}
        placeholder="Filter by category"
        isClearable
      />

      <Select
        options={dateOptions}
        placeholder='Filter by published year'
        onChange={handleSelect("publishedDate")}
        isClearable
      />

      <button
        onClick={resetFilters}
        className="reset-button"
      >
        Reset
      </button>
    </div>
  );
}
