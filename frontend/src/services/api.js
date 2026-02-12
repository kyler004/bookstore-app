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

  // Other endpoints
};

export default api;
