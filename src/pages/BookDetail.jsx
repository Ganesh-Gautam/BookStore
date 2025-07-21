import './BookDetail.css'; //  
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

export default function BookDetail() {
  let { id } = useParams();
  id=Number(id);
  const navigate = useNavigate(); 
  const {books, loading} = useSelector((state) => state.books);
  const book = books.find(u => u.id === id);

  if (loading) {
    return <p className="book-detail-container">Loading book detail...</p>;
  }

  if (!book) {
    return (
      <div className="book-detail-container">
        <p>Book not found.</p>
        <button onClick={() => navigate(-1)} className="back-button">Go Back</button>
      </div>
    );
}
  const info = book.volumeInfo;

  return (
    <div className="book-detail-container">
      <button onClick={() => navigate(-1)} className="back-button">
        Back
      </button>

      <div className="book-content">
        <img
          src={info.imageLinks?.thumbnail || 'https://via.placeholder.com/150x200?text=No+Image'}
          alt={info.title || 'No Title'}
          className="book-image"
        />

        <h1 className="book-title">
          {info.title || 'Title not available'}
        </h1>

        <h2 className="book-subtitle">
          {info.subtitle || 'Subtitle not available'}
        </h2>

        <p className="book-meta">
          Authors: {info.authors?.join(', ') || 'Author information not available'}
        </p>

        <p className="book-publisher">
          Publisher: {info.publisher || 'Publisher not available'}
        </p>

        <p className="book-meta">
          Published: {info.publishedDate || 'Published date not available'}
        </p>

        <p className="book-category">
          Category: {info.categories?.join(', ') || 'Category not available'}
        </p>

        <p className="book-pages">
          Number of Pages: {info.pageCount || 'Page count not available'}
        </p>

        {info.description ? (
          <p className="book-description">{info.description}</p>
        ) : (
          <p className="no-book-description">No description available.</p>
        )}
      </div>

    </div>
  );
}
