import './Home.css';  
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { fetchBooks } from "../store/features/books/booksSlice";
import BookCard from '../components/BookCard';
import BookFilters from '../components/BookFilters';
import Fuse from 'fuse.js';
import { Heart } from 'lucide-react';

export default function Home() {
  const [filtered, setFiltered] = useState([]);

  const dispatch = useDispatch();
  const { books, loading, hasMore, error, filters, page, favorites } = useSelector(state => state.books);
   
  useEffect(() => {
    if (books.length === 0) {
      dispatch(fetchBooks(page)); // fetch first page only once
    }
  }, [dispatch ]);

  useEffect(() => {
    const fuse = new Fuse(books, {
      keys: ['volumeInfo.title'],
      threshold: 0.4,
    });

    let results = filters.title
      ? fuse.search(filters.title).map(res => res.item)
      : books;

    results = results.filter(book => {
      const { authors = [], categories = [], publishedDate = '' } = book.volumeInfo || {};
      return (
        (!filters.author || authors.join(', ').toLowerCase().includes(filters.author.toLowerCase())) &&
        (!filters.category || categories.join(', ').toLowerCase().includes(filters.category.toLowerCase())) &&
        (!filters.publishedDate || publishedDate.startsWith(filters.publishedDate))
      );
    });

    setFiltered(results);
  }, [books, filters]);

  const loadMore = () => {
    if (!loading && hasMore) {
      dispatch(fetchBooks(page+1));
    }
  };

  return (
    <div className="home-container">
      <BookFilters  books={books} /> 
      <div className="favorites-button">
        <Heart size={20} color='gray'/>
        <Link to="/favorites" className="favorite-link">Favorites</Link>
        <div className='favorite-count'>{favorites.length}</div>
      </div>
      {books.length === 0 ? <p>{error}</p> : null}
      
      <div className="books-grid">
        {filtered.map(book => (
          <BookCard key={book.id} id={book.id} book={book.volumeInfo} />
        ))}
      </div>

      {loading && <p className="loading-text">Loading...</p>}

      {!loading && hasMore && (
        <button
          onClick={loadMore}
          className="load-more-btn"
        >
          Load More
        </button>
      )}
    </div>
  );
}
