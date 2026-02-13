const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = {
  getAllBooks: async () => {
    const response = await fetch(`${API_BASE_URL}/api/books`);
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || "Something went wrong");
    }
    return data.data;
  },

  // creating books
  createBook: async (bookData) => {
    const response = await fetch(`${API_BASE_URL}/api/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });
    if (!response.ok) {
      throw new Error("Failed to create book");
    }
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || "Something went wrong");
    }
    return data.data;
  },

  // updating books
  updateBook: async (id, bookData) => {
    const response = await fetch(`${API_BASE_URL}/api/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });
    if (!response.ok) {
      throw new Error("Failed to update book");
    }
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || "Something went wrong");
    }
    return data.data;
  },

  // deleting books
  deleteBook: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/books/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete book");
    }
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || "Something went wrong");
    }
    return data.data;
  },

  // getting a single book
  getBook: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/books/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch book");
    }
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || "Something went wrong");
    }
    return data.data;
  },
};

export default api;
