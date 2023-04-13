import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../components/Card";

import styles from "./Search.module.css";
import useDocumentTitle from "../hooks/useDocumentTitle";

const apiKey = import.meta.env.VITE_API_KEY;
const searchURL = import.meta.env.VITE_SEARCH;

export default function Search() {
  const [searchParams] = useSearchParams();

  const [movies, setMovies] = useState([]);
  const query = searchParams.get("q");

  const getSearchedMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovies(data.results);
  };

  useEffect(() => {
    const searchWithQuery = `${searchURL}?${apiKey}&query=${query}&language=pt-PT`;
    
    getSearchedMovies(searchWithQuery);
  }, [query]);

  useDocumentTitle(query);
  
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Resultados para:
        <span className={styles.query}>{query}</span>
      </h2>

      <section>
        {movies.length > 0 &&
          movies.map((movie) => <Card cardClass={styles.card} movie={movie} key={movie.id} />)}
      </section>
    </div>
  );
}
