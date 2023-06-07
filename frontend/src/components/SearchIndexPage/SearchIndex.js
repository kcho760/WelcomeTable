import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function SearchIndex() {
  const { searchTerm } = useParams();

  useEffect(() => {
    
  }, [searchTerm]);

  return (
    <div>
      <h1>Search Results for: {searchTerm}</h1>

    </div>
  );
}

export default SearchIndex;
