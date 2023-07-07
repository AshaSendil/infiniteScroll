import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    const url = `https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page/${currentPage}`;

    axios.get(url)
      .then(response => {
        const newArticles = response.data.articles || [];
        setArticles(prevArticles => [...prevArticles, ...newArticles]);
        setCurrentPage(prevPage => prevPage + 1);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      fetchArticles();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
        <h1 className="text-3xl font-bold mb-4">Infinite Scroll</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {articles.map((article, index) => (
            <div key={index} className="mb-6 p-4 border border-gray-300 rounded">
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-gray-600">{article.description}</p>
              <img src={article.image} alt={article.title} className="mt-4" />
            </div>
          ))}
        </div>
        {isLoading && <p className="text-center mt-4">Loading...</p>}
      </div>
    </div>
  );
};

export default App;
