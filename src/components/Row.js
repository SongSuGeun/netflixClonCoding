import React, { useState, useEffect } from "react";
import axios from "../api/axios.js"
import "./Row.css"

export default function Row({ isLargeRow, title, id, fetchUrl }) {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchTopRatedMovie();
    }, []);

    const fetchTopRatedMovie = async () => {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results)
    }


    return (
        <section className="row">
            <h2>{title}</h2>
            <div className="slider">
                <div className="slider__arrow-left">
                    <span className="arrow" onClick={() => {
                        document.getElementById(id).scrollLeft -= window.innerWidth - 80;
                    }}>{"<"}</span>
                </div>
                <div id={id} className="row__posters">
                    {
                        movies.map((movie) => (
                            <img
                                key={movie.id}
                                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                                src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                alt={movies.name}
                            />
                        ))
                    }
                </div>
                <div className="slider__arrow-right">
                    <span className="arrow" onClick={() => {
                        document.getElementById(id).scrollLeft += window.innerWidth - 80;
                    }}>{">"}</span>
                </div>
            </div>
        </section>
    )
}