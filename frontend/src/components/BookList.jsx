import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import BookForm from "./BookForm";
import Modal from "./Modal";
import ConfirmModal from "./ConfirmModal";

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

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
  }, [refreshKey]);

  const handleBookAdded = () => {
    setRefreshKey((prevKey) => prevKey + 1);
    setIsModalOpen(false);
    setSelectedBook(null);
    setIsEditMode(false);
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = (book) => {
    setSelectedBook(book);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedBook) return;

    try {
      await api.deleteBook(selectedBook._id);
      toast.success(`"${selectedBook.title}" removed from collection`);
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (err) {
      toast.error(err.message || "Failed to delete book");
    } finally {
      setIsDeleteOpen(false);
      setSelectedBook(null);
    }
  };

  const handleOpenAddModal = () => {
    setSelectedBook(null);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-medium animate-pulse">
          Curating your library...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl shadow-sm max-w-2xl mx-auto">
          <div className="flex items-center">
            <svg
              className="w-8 h-8 text-red-500 mr-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="text-lg font-bold text-red-800">
                Connection Error
              </h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">
            Our Collection
          </h2>
          <p className="text-gray-500 mt-1">
            Explore {books.length} curated titles just for you
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-2xl transition-all shadow-lg shadow-blue-200 active:scale-95 group"
        >
          <svg
            className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add New Book
        </button>
      </div>

      {books.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800">No books found</h3>
          <p className="text-gray-500 mt-2">
            Your library is currently empty. Start adding some!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                {book.coverImage ? (
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                    <span className="text-gray-400 font-medium">No cover</span>
                  </div>
                )}
                {book.genre && (
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm">
                    {book.genre}
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white text-sm line-clamp-2">
                    {book.description || "No description available."}
                  </p>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4 flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-1 mb-1 group-hover:text-blue-600 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-gray-500 text-sm font-medium">
                      by {book.author}
                    </p>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(book)}
                      className="p-2 bg-white text-gray-400 hover:text-blue-600 rounded-lg border border-gray-100 hover:border-blue-100 hover:bg-blue-50 transition-all shadow-sm"
                      title="Edit book"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(book)}
                      className="p-2 bg-white text-gray-400 hover:text-red-600 rounded-lg border border-gray-100 hover:border-red-100 hover:bg-red-50 transition-all shadow-sm"
                      title="Delete book"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v2m3 4s-3 4-3 4"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-black tracking-widest mb-1">
                      Price
                    </p>
                    <p className="text-2xl font-black text-gray-900">
                      ${book.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 uppercase font-black tracking-widest mb-1">
                      Stock
                    </p>
                    <p
                      className={`text-sm font-bold ${book.stock > 0 ? "text-green-600" : "text-red-500"}`}
                    >
                      {book.stock} units
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Integration */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedBook(null);
          setIsEditMode(false);
        }}
        title={isEditMode ? "Update Information" : "Add to Collection"}
      >
        <BookForm
          onBookAdded={handleBookAdded}
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedBook(null);
            setIsEditMode(false);
          }}
          initialData={selectedBook}
        />
      </Modal>

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedBook(null);
        }}
        onConfirm={confirmDelete}
        title="Remove Book"
        message={`Are you sure you want to remove "${selectedBook?.title}" from the collection? This action cannot be undone.`}
        confirmText="Yes, Delete"
      />
    </div>
  );
}

export default BookList;
