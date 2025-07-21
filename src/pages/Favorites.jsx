import './Favorites.css';
import { useSelector } from 'react-redux';
import BookCard from '../components/BookCard';
import { useEffect, useState } from 'react';

export default function Favorites() {
    const { favorites } = useSelector((state) => state.books);
    const [favoriteBooks, setFavoriteBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavoriteBooks = async () => {
        setLoading(true);
        try {
            const requests = favorites.map((id) =>
            fetch(`https://api.freeapi.app/api/v1/public/books/${id}`).then((res) =>
                res.json()
            )
            );
            const responses = await Promise.all(requests);
 
            const booksData = responses
            .filter((res) => res.success && res.data)
            .map((res) => res.data);

            setFavoriteBooks(booksData);
        } catch (error) {
            console.error("Error fetching favorite books:", error);
        } finally {
            setLoading(false);
        }
        };

        if (favorites.length > 0) {
        fetchFavoriteBooks();
        } else {
        setFavoriteBooks([]);
        setLoading(false);
        }
    }, [favorites]);

    return (
        <div className="favorites-container">
        <h1 className="favorites-heading">Your Favorite Books ❤️</h1>

        {loading ? (
            <p className="favorites-loading">Loading your favorite books...</p>
        ) : favoriteBooks.length === 0 ? (
            <p className="no-favorites">You haven’t added any favorites yet.</p>
        ) : (
            <div className="books-grid">
            {favoriteBooks.map((book) => (
                <BookCard key={book.id} id={book.id} book={book.volumeInfo} />
            ))}
            </div>
        )}
        </div>
    );
}
