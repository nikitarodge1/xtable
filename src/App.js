import React, { useState, useMemo } from 'react';
import './App.css';

const App = () => {
  const initialData = [
    { date: "2022-09-01", views: 100, article: "Article 1" },
    { date: "2023-09-01", views: 100, article: "Article 1" },
    { date: "2023-09-02", views: 150, article: "Article 2" },
    { date: "2023-09-02", views: 120, article: "Article 3" },
    { date: "2020-09-03", views: 200, article: "Article 4" }
  ];

  const [data, setData] = useState(initialData);
  const [sortType, setSortType] = useState(null);

  const sortedData = useMemo(() => {
    if (!sortType) return data;
    return [...data].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (sortType === 'date') {
        return dateB - dateA || b.views - a.views;
      } else if (sortType === 'views') {
        return b.views - a.views || dateB - dateA;
      }
      return 0;
    });
  }, [data, sortType]);

  return (
    <div className="app">
      <h1>Date and Views Table</h1>
      <button onClick={() => setSortType('date')}>Sort by Date</button>
      <button onClick={() => setSortType('views')}>Sort by Views</button>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Views</th>
            <th>Article</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.views}</td>
              <td>{item.article}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
