import React from "react";
import BookList from "./components/BookList";
function App() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-100 py-8 sticky top-0 z-40 backdrop-blur-md bg-white/80">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter">
              BOOK<span className="text-blue-600">STORE</span>
            </h1>
            <p className="text-gray-500 font-medium tracking-wide text-sm uppercase">
              Curated Excellence
            </p>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex gap-6">
              <a
                href="#"
                className="font-bold text-gray-900 border-b-2 border-blue-600 pb-1"
              >
                Collection
              </a>
              <a
                href="#"
                className="font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                Categories
              </a>
              <a
                href="#"
                className="font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                About
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="bg-gray-50/50">
        <BookList />
      </main>
    </div>
  );
}

export default App;
