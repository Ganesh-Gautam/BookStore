import './BookCard.css';  
import { useNavigate } from "react-router-dom"; 
import { useDispatch , useSelector  } from 'react-redux';
import {toggleFavorite} from '../store/features/books/booksSlice';
import {Heart} from 'lucide-react'

export default function BookCard({ book, id }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state)=> state.books.favorites);

  const isFavorite= favorites.includes(id);
  const handleCardClick=(e)=>{
    if(e.target.closest('.favorite-icon')) return ;
    navigate(`/book/${id}`);
  }
  
  return (
    <div onClick={ handleCardClick} className="book-card">
      <img
        src={book.imageLinks?.thumbnail}
        alt={book.title}
        className="book-card-image"
      />
      <div className='favorite-icon' onClick={()=>dispatch(toggleFavorite(id))}>
        {isFavorite ? <Heart size={20} fill="red" color='red'/> : <Heart size={20} color="white" />}
      </div>
      <h2 className="book-card-title">{book.title}</h2>
      <p className="book-card-authors">{book.authors[0]}</p>
    </div>
  );
}
