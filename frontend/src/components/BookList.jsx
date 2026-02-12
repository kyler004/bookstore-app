import { useState, useEffect } from "react";
import api from "../services/api";

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const fetchedBooks = await api.getAllBooks();
        setBooks(fetchedBooks);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []); // Empty dependency array = run once on mount

  if (loading)
    return <div className="text-center py-10 text-xl">Loading books...</div>;

  if (error)
    return (
      <div className="text-center py-10 text-red-600 text-xl">
        Error: {error}
      </div>
    );

  if (books.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 text-xl">
        No books found. Add some!
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Our Book Collection
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {book.coverImage ? (
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-64 object-cover"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No cover</span>
              </div>
            )}
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {book.title}
              </h3>
              <p className="text-gray-600 mb-1">by {book.author}</p>
              <p className="text-sm text-gray-500 mb-3">
                {book.genre || "Uncategorized"}
              </p>
              <p className="text-lg font-bold text-green-600">
                ${book.price.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500 mt-2">Stock: {book.stock}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;
