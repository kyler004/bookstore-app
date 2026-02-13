import React from "react";
import BookList from "./components/BookList";
function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">Bookstore</h1>
          <p className="mt-2 opacity-90">Discover your next great read</p>
        </div>
      </header>

      <main>
        <BookList />
      </main>
    </div>
  );
}

export default App;
